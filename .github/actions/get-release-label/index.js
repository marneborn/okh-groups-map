// const {Context} = require('@actions/github/lib/context');

const getLabels = (context) => {
  console.log(JSON.stringify(context, null, 2));
  return;
};

module.exports = getLabels;