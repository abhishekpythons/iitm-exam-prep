---
name: add-subject
description: Add one or more subjects to the IITM Exam Prep site for a given exam (quiz1, quiz2, endterm). Use when the user says "add subject in quiz_x", "add <subject> to quiz2", "add endterm notes for <subject>", or pastes quizpractice.space exam URLs. Reads past papers, writes the subject data file, registers it, verifies, and commits.
---

# Add a subject to an exam

Usage the user will type, in any wording:

- `/add-subject quiz2 <quizpractice URL> [<URL> ...]`
- `add subject in quiz1: <URL>`
- `add Machine Learning Techniques to endterm` (no URL: ask for the quizpractice.space link, or work from the course syllabus if they say so)

Arguments: `$ARGUMENTS`

## 1. Work out the inputs

- **Exam id**: one of the ids in `js/exams.js` (`quiz1`, `quiz2`, `endterm`). Normalise the user's words: "quiz 2", "Quiz2", "quiz_2" → `quiz2`; "end term", "final", "ET" → `endterm`. If the exam is new (for example `oppe`), add an entry to `window.EXAMS` in `js/exams.js`.
- **Source URLs**: `https://quizpractice.space/exam/<exam-uuid>?sub=<course_id>`. Each URL is one subject. The exam uuid identifies Quiz 1 / Quiz 2 / End Term on that site. Known: Quiz 1 = `9251bc3a-e33e-45e0-bcf0-b16a0ea5b5fa`. When you learn the uuid for another exam, add it to the table at the bottom of this file.
- If the subject already exists for that exam (`js/data/<exam>/<id>.js`), extend it instead of creating a duplicate.

## 2. Read the past papers (built-in browser)

1. Open the exam URL with the browser tools and run `get_page_text` to see the bundles (dates) and paper names.
2. Get each paper's uuid. In the page, run this once (single fetch, read-only) to list them:
   ```js
   const html = await fetch(location.href).then(r => r.text());
   const ta = document.createElement('textarea');
   ta.innerHTML = html.match(/data-page="([^"]+)"/)[1];
   const exam = JSON.parse(ta.value).props.exam;
   const xsrf = decodeURIComponent((document.cookie.match(/XSRF-TOKEN=([^;]+)/) || [])[1] || '');
   const res = await fetch('/api/get-questions-paper-by-exam', { method: 'POST',
     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-XSRF-TOKEN': xsrf, 'X-Requested-With': 'XMLHttpRequest' },
     body: JSON.stringify({ course_id: <sub>, year: 'all', exam_id: exam.en_id }) }).then(r => r.json());
   JSON.stringify(res.map(g => ({ g: g.name, p: g.question_papers.map(p => p.uuid + '|' + p.question_paper_name) })));
   ```
3. Read papers by **navigating** to `https://quizpractice.space/question-paper/practise/<course_id>/<paper_uuid>` and calling `get_page_text` (batch 3 papers per `browser_batch`). Do **not** loop `fetch` over every paper in one script: that was blocked by the permission classifier in an earlier session.
4. Papers in the same bundle (QDB2/QDB3/QDB4, QIM2…) are near-identical variants. Read 1 per bundle, newest bundles first, at least 3 papers total, more if topics keep changing. Note the total marks, number of questions, question types (MCQ / MSQ / SA numeric / comprehension sets), and marks per question.
5. Many stems are images and come through as blank text. Infer the topic from the options and the neighbouring questions; say so in the subject's `papers` field.

## 3. Write the subject file

Create `js/data/<exam>/<subject-id>.js` (kebab-case id). Copy the exact shape of an existing file such as `js/data/quiz1/corporate-finance.js`:

```js
(function () {
  const R = String.raw;
  window.SUBJECTS.push({
    exam: '<exam>',               // must match the folder name
    id: '<subject-id>',
    name: 'Full Course Name',
    short: 'Short Name',          // topbar label, ≤ 14 chars
    level: 'Degree level',        // or 'Foundation level', 'Diploma level', ...
    color: '#hex',                // pick one not already used by other subjects in this exam
    blurb: 'One or two sentences listing the main topics.',
    chips: ['4–5', 'short', 'topic', 'tags'],
    papers: 'Which sessions were read, and any caveats (image-only questions).',
    pattern: {
      facts: [{ k: 'Total marks', v: '...' }, { k: 'Questions', v: '...' }, ...],   // 4 facts
      rows: [{ topic, how, weight: 'high' | 'medium' | 'low' }, ...]               // what the papers keep asking
    },
    tips: [ '...', ... ],                                   // 5–6 exam-day traps
    topics: [{ title, weight, html }, ...],                 // 8–11 concept notes
    formulas: [{ group, items: [{ name, tex, note? } | { name, code, note? }] }],
    examples: [{ tag, q, a }, ...],                         // 5–8, modelled on real PYQs
    quiz: [{ q, options: [..4], answer: <0-based index>, why }, ...]   // 10–14
  });
})();
```

Content rules:

- Text fields are HTML. Maths: `$inline$` and `$$display$$` (KaTeX). Wrap strings in `` R`...` `` so backslashes survive.
- Inside HTML, write `&lt;` `&gt;` `&amp;` for `<` `>` `&` (the renderer decodes them inside maths). For code in the formula sheet use `code: '...'` instead of `tex`.
- Useful HTML classes in `html`: `<p class="key">` for the core idea, `<p class="trap">` for a common mistake, `<table>`, `<pre><code>`.
- Worked examples and practice questions are modelled on the real PYQ templates with changed numbers. Do not copy paper text verbatim. Compute every numeric answer and double-check it before writing.
- The `answer` index must point at the correct option. Re-verify all of them at the end.

## 4. Register it

In `index.html`, add `<script src="js/data/<exam>/<subject-id>.js"></script>` between the `SUBJECT FILES` markers, under a `<!-- <exam> -->` comment (create the comment group if this is the exam's first subject). Order of groups should follow `js/exams.js`.

## 5. Verify

1. Start the preview: `preview_start` with name `quiz1-site` (from `.claude/launch.json`, port 8765). Open `http://localhost:8765/#/<exam>/<subject-id>/overview`.
2. Check the console has no errors.
3. Run in the page, for every tab, a check that there are no `.katex-error` elements, no leftover raw `$` in `main` text, and no horizontal overflow:
   ```js
   const out = {};
   for (const t of ['overview','concepts','formulas','examples','quiz']) {
     location.hash = '#/<exam>/<subject-id>/' + t;
     await new Promise(r => setTimeout(r, 300));
     if (t === 'examples') document.querySelectorAll('.example button').forEach(b => b.click());
     await new Promise(r => setTimeout(r, 150));
     out[t] = { errs: document.querySelectorAll('.katex-error').length,
                rawDollar: (document.querySelector('main').innerText.match(/\$[^\s]/g) || []).length,
                overflow: document.documentElement.scrollWidth > innerWidth };
   }
   JSON.stringify(out);
   ```
4. Take one screenshot of the home page to confirm the exam group and card appear.

## 6. Commit

Commit on `main` with a message like `Add <Subject> to <Exam>`, ending with the Co-Authored-By line from the session's attribution reminder. Do not push unless the user asks; if a remote `origin` exists, offer to push (GitHub Pages redeploys on push).

## Known quizpractice exam uuids

| Exam | uuid |
|---|---|
| quiz1 | `9251bc3a-e33e-45e0-bcf0-b16a0ea5b5fa` |
| quiz2 | (add when known) |
| endterm | (add when known) |
