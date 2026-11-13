# Quiz 1 Prep

Study site for IIT Madras BS Quiz 1 covering four subjects:

- Game Theory and Strategy
- Corporate Finance
- Deep Learning
- Embedded C Programming

Each subject has its own page with five sections: exam pattern (what past papers keep asking), concepts, a printable formula sheet, worked examples, and practice questions with explanations.

## Stack

Vue 3, loaded from a CDN. There is no build step: the repository root is the site. KaTeX (also from a CDN) renders the maths. Routing uses the URL hash, so it works on GitHub Pages without any 404 redirect tricks.

```
index.html
css/style.css
js/app.js                 Vue app: router, pages, components
js/data/*.js              One content file per subject
```

## Run locally

Any static server works:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a repository on GitHub and push these files to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. The site appears at `https://<username>.github.io/<repository>/` after a minute or so.

## Editing content

Each file in `js/data/` pushes one subject object onto `window.SUBJECTS`. Text fields accept HTML, with `$...$` for inline maths and `$$...$$` for display maths (LaTeX). Add a topic, formula, example or question by appending to the matching array.
