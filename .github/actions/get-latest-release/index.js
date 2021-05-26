const core = require('@actions/core');
const github = require('@actions/github');

// const { Octokit } = require("@octokit/rest");

const owner = 'marneborn';
const repo = 'okh-groups-map';

const token = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(token)

async function run() {
  try {
    const release = await octokit.rest.repos.getLatestRelease({ owner, repo });
    console.log('latest release: ', release.data.tag_name);
    core.setOutput('version', release.data.tag_name);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()