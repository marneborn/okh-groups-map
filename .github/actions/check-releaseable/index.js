const core = require('@actions/core');
const github = require('@actions/github');

try {
  const labelNames = github.context.pull_request.labels.map(label => label.name)
  console.log(JSON.stringify(labelNames))
  throw new Error('oops')
} catch (error) {
  core.setFailed(error.message);
}