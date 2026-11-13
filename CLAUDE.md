# IITM Exam Prep site

Static study website for IIT Madras BS exams (Quiz 1, Quiz 2, End Term), hosted on GitHub Pages. Each subject page has: exam pattern from past papers, concept notes, a formula sheet, worked examples and practice MCQs.

## Adding content

The user will keep adding subjects and exams. Use the project skill **`/add-subject`** (`.claude/skills/add-subject/SKILL.md`) for any request like "add subject in quiz2", "add <course> to endterm", or a pasted `quizpractice.space/exam/...?sub=<id>` URL. It covers reading past papers, the data file format, registration, verification and committing. Do not ask the user to re-explain the setup.

## Layout

- No build step. Vue 3 and KaTeX load from jsDelivr. The repo root is the site.
- `js/exams.js`: exam registry (`quiz1`, `quiz2`, `endterm`). An exam appears on the site only once it has a subject.
- `js/data/<exam>/<subject-id>.js`: one file per subject, pushes an object onto `window.SUBJECTS` with `exam: '<exam>'`.
- `index.html`: one `<script>` tag per subject file, between the `SUBJECT FILES` markers.
- `js/app.js`: hash router (`#/`, `#/<exam>`, `#/<exam>/<subject>/<tab>`), pages and components. Revision ticks are stored in localStorage under `rev:<exam>:<subject>`.
- Local preview: `.claude/launch.json` config `quiz1-site` (python http.server on port 8765). `.claude/` is git-ignored except for the skill.

## Conventions

- Git branch `main`. The repo has a local author identity configured. Commit after each subject; push only when asked.
- Content is written from recurring past-paper question types, with changed numbers. Do not copy paper text verbatim, and verify every numeric answer.
