const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');
const path = require('path');
const fs = require('fs');

const owner = 'marneborn';
const repo = 'okh-groups-map';

const version = '0.1.8';
const prNumber = '9';
console.log(JSON.stringify(process.env, null, 2));
const token = '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';
console.log('token', token);
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
