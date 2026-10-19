# Rakhshethan Subenthiran — portfolio

## Development branch (not deployed)

Current design work is backed up on `development`, separately from the live `main` branch. Regular milestone commits must preserve the no-deployment safeguard in `vercel.json`. This branch does not authorize publication. See `AGENTS.md` for the workflow.

After cloning, enable the local protection with `git config core.hooksPath .githooks`. Pushes fail closed until Vercel deployment safety has been checked and locally attested. Run `node --test scripts/push-guard.test.mjs` to check the push guard. Never use `--no-verify` to bypass it.

The existing local preview supports `?layout=stacked` for the carousel comparison; the default URL retains the split presentation.

A concise, responsive application portfolio for software engineering internships and spring weeks.

## Sections

- Projects
- Experience
- Education
- Contact links

The site is dependency-free and ready for Vercel or GitHub Pages. `index.html` and the `assets` directory must remain together so the CV, video and social-preview image resolve correctly.

The Opportunity Cost Engine is accurately labelled as a four-person team project, with Rakhshethan’s individual contribution taken from his CV.

The project entry includes the original hackathon demonstration video, the two-day build context and a concise explanation of the sentiment-analysis feature.
