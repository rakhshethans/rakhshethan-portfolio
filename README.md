# Rakhshethan Subenthiran — portfolio

## Development branch (not deployed)

Current design work is backed up on `development`, separately from the live `main` branch. Regular milestone commits must preserve the no-deployment safeguard in `vercel.json`. This branch does not authorize publication. See `AGENTS.md` for the workflow.

After cloning, enable the local protection with `git config core.hooksPath .githooks`. Pushes fail closed until Vercel deployment safety has been checked and locally attested. Run `node --test scripts/push-guard.test.mjs` to check the push guard. Never use `--no-verify` to bypass it.

The chosen responsive project carousel is now the default at `/`; no query parameter is required. Existing `?layout=stacked` bookmarks show the same layout. Cards adapt to the viewport, retain matching video frames and use a fresh-scroll entry hold when pinned.

## Production candidate (not yet published)

`index.html` contains the public page title, indexable metadata, canonical URL and absolute social-image URL for `https://rakhshethan-portfolio.vercel.app/`. The preview banner is removed. These file changes do not publish the site or authorize a push/merge/deployment.

The workspace preview server (`work/narration-demo/serve-preview.mjs`, run from the parent workspace) binds only to `127.0.0.1:8032` and sends `X-Robots-Tag: noindex, nofollow`. Keep local preview protection separate from public HTML metadata. The development deployment safeguard in `vercel.json` must remain disabled.

Run all regression checks with `node --test scripts/*.test.mjs`. Before an approved release, smoke-test the normal URL, CV, recorded demos, source links and mobile layout; retain the previous production deployment for rollback.

A concise, responsive application portfolio for software engineering internships and spring weeks.

## Sections

- Projects
- Experience
- Education
- Contact links

The site is dependency-free and ready for Vercel or GitHub Pages. `index.html` and the `assets` directory must remain together so the CV, video and social-preview image resolve correctly.

The Opportunity Cost Engine is accurately labelled as a four-person team project, with Rakhshethan’s individual contribution taken from his CV.

The project entry includes the original hackathon demonstration video, the two-day build context and a concise explanation of the sentiment-analysis feature.
