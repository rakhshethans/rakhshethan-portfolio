import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const origin = 'https://github.com/rakhshethans/rakhshethan-portfolio.git';
const developmentRef = 'refs/heads/development';

export function validatePush({ remoteName, remoteUrl, branch, verified, updates, configuration, workflows }) {
  if (remoteName !== 'origin' || remoteUrl !== origin) throw new Error('Only the approved portfolio origin may be pushed.');
  if (branch !== 'development') throw new Error('Only the development branch may be pushed.');
  if (verified !== 'true') throw new Error('Deployment safety is not verified. Inspect Vercel before pushing.');
  if (!updates.length) throw new Error('No explicit development update was supplied.');
  for (const update of updates) {
    if (update.localRef !== developmentRef || update.remoteRef !== developmentRef || /^0+$/.test(update.sha)) {
      throw new Error('Only a non-deleting development:development update is allowed; main and tags are blocked.');
    }
  }
  if (configuration?.git?.deploymentEnabled?.development !== false ||
      Object.entries(configuration.git.deploymentEnabled).some(([key, value]) => key !== 'development' && value === true)) {
    throw new Error('Committed vercel.json must disable development deployments without competing enable rules.');
  }
  if (workflows.length) throw new Error('Review independent GitHub Actions workflows before pushing; automatic pushes are blocked.');
}

function git(...args) {
  const result = spawnSync('git', args, { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(`Unable to verify Git state (${args[0]}).`);
  return result.stdout.trim();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const updates = readFileSync(0, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(line => {
      const [localRef, sha, remoteRef] = line.split(/\s+/);
      return { localRef, sha, remoteRef };
    });
    const branch = git('branch', '--show-current');
    const verified = git('config', '--get', 'portfolio.deploymentSafetyVerified');
    for (const update of updates) {
      const configuration = JSON.parse(git('show', `${update.sha}:vercel.json`));
      const workflows = git('ls-tree', '-r', '--name-only', update.sha, '.github/workflows').split('\n').filter(Boolean);
      validatePush({ remoteName: process.argv[2], remoteUrl: process.argv[3], branch, verified, updates: [update], configuration, workflows });
    }
    if (!updates.length) throw new Error('No development update to verify.');
    console.log('Push guard: development only; Vercel automatic deployment disabled.');
  } catch (error) {
    console.error(`Push blocked: ${error.message}`);
    process.exitCode = 1;
  }
}
