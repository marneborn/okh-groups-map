const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

// const { Octokit } = require("@octokit/rest");

const owner = 'marneborn';
const repo = 'okh-groups-map';

const github = new GitHub()

async function run() {
  try {
    const release = await github.repos.getLatestRelease({ owner, repo });
    console.log('latest release: ', release.data.tag_name);
    core.setOutput('version', release.data.tag_name);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()