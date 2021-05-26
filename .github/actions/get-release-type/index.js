const core = require('@actions/core');
const github = require('@actions/github');

const labelToVersion = {
  'release-major': 'major',
  'release-minor': 'minor',
  'release-patch': 'patch',
};

try {
  console.log(JSON.stringify(github.context, null, 2))
  const labelNames = github.context.payload.pull_request.labels
    .map(label => label.name)
    .filter(labelName => labelToVersion[labelName]);

  console.log(JSON.stringify(labelNames))

  if (labelNames.length === 0) {
    core.setFailed('No labels set');
  } else if (labelNames.length > 1) {
    core.setFailed(`Multiple labels set: ${labelNames.join(', ')}`);
  } else {
    console.log('dsfdsfds', labelToVersion[labelNames[0]]);
    core.setOutput('versionType', labelToVersion[labelNames[0]]);
  }
} catch (error) {
  core.setFailed(error.message);
}