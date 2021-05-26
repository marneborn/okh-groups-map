const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const path = require('path');
const fs = require('fs');

const owner = 'marneborn';
const repo = 'okh-groups-map';

const version = core.getInput('version');
const prNumber = core.getInput('pr-num');
const token = core.getInput('GITHUB_TOKEN');
const octokit = github.getOctokit(token);

async function run() {
  try {
    const createReleaseResponse = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: version,
      name: `v${version} - ${new Date().toISOString()}`,
      body: `https://github.com/${owner}/${repo}/pull/${prNumber}`,
      draft: false,
      prerelease: false,
      target_commitish: 'main',
    });

    const release = createReleaseResponse.data;

    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl },
    } = createReleaseResponse;
    core.debug(`Create release ${version} (${releaseId}): ${htmlUrl}.`);

    const assetName = 'index.js';
    const file = path.resolve('dist/index.js');
    const stat = fs.statSync(file);
    if (!stat.isFile()) {
      core.setFailed('Could not upload dist/index.js');
      return;
    }

    const fileSize = stat.size;
    const fileBytes = fs.readFileSync(file);

    core.debug(`Uploading ${file} to ${assetName} in release ${version}.`);
    const uploadResponse = await octokit.rest.repos.uploadReleaseAsset(
      {
        url: uploadUrl,
        name: assetName,
        data: fileBytes,
        headers: {
          'content-type': 'binary/octet-stream',
          'content-length': fileSize,
        },
      },
    );
    core.debug(`Added ${assetName}: ${uploadResponse.data.browser_download_url}`);
    return uploadResponse.data.browser_download_url;
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
