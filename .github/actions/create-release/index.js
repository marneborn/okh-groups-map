const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

const owner = 'marneborn';
const repo = 'okh-groups-map';

const version = core.getInput('version');
const prNum = core.getInput('pr-num');
const token = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(token)

async function run() {
  try {
    const release = await octokit.rest.repos.getLatestRelease({ owner, repo });

    const createReleaseResponse = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: version,
      name: `v${version} - new Date().toISOString()`,
      body: `https://github.com/${owner}/${repo}/pull/${prNum}`,
      draft: false,
      prerelease: false,
      target_commitish: 'main'
    });

    console.log('new release: ', console.log(createReleaseResponse, null, 2));
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()