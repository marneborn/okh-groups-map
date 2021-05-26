const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

const owner = 'marneborn';
const repo = 'okh-groups-map';

const octokit = new Octokit()

async function run() {
  try {
    const release = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });
    console.log('aaaa' + JSON.stringify(release, null, 2));
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()