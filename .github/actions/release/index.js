const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

// const { Octokit } = require("@octokit/rest");

const owner = 'marneborn';
const repo = 'okh-groups-map';

const version = core.getInput('versionn');
const prNum = core.getInput('pr-num');
const token = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(token)

async function run() {
  try {
    console.log(JSON.stringify(github.context, null, 2))
    const release = await octokit.rest.repos.getLatestRelease({ owner, repo });

    const createReleaseResponse = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: version,
      name: new Date().toISOString(),
      body: `https://github.com/${owner}/${repo}/pull/$prNum",
      draft,
      prerelease,
      target_commitish: commitish
    });

    console.log('latest release: ', console.log(createReleaseResponse, null, 2));
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()