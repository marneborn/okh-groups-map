const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

// const { Octokit } = require("@octokit/rest");

const owner = 'marneborn';
const repo = 'okh-groups-map';

const releaseType = core.getInput('releaseType');
const token = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(token)

async function run() {
  try {
    const release = await octokit.rest.repos.getLatestRelease({ owner, repo });
    console.log('latest release: ', release.data.tag_name);
    const newVersion = semver.inc(release.data.tag_name, releaseType);
    console.log('newVersion: ', newVersion);
    core.setOutput('version', newVersion);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()