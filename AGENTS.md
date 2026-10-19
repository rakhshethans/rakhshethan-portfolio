# Portfolio development workflow

- This checkout belongs only to `https://github.com/rakhshethans/rakhshethan-portfolio.git`.
- Work on `development`. Make meaningful commits after verified milestones as work proceeds; do not fabricate or backdate historical commits.
- Push only `development:development`, without force, after reviewing the exact staged changes and confirming deployment safety. Never push or merge into `main`, create release tags, open deployment-triggering PRs, or deploy without new user approval.
- `vercel.json` must keep `git.deploymentEnabled.development` set to `false`. Do not remove this safeguard or enable deployments without user approval.
- The pre-push hook also requires a local `portfolio.deploymentSafetyVerified=true` attestation after verifying the connected Vercel project, repository root, production branch and absence of independent deployment workflows/hooks. If deployment configuration changes or cannot be verified, set it to `false` and stop before pushing.
- Keep using this `portfolio-preview` checkout for the local server. Do not modify the collaborators' Opportunity Cost Engine repository.
- Keep secrets, authentication files and unrelated workspace projects out of commits. Do not edit the CV unless explicitly requested.
- Complete visual browser verification whenever changing the site; inspect desktop and mobile for layout/style changes. Report a browser blocker honestly.
- Do not use the Sites skill.

The development branch includes both the default split presentation and the optional `?layout=stacked` comparison. Backing up this branch to GitHub does not grant permission to publish either presentation.
