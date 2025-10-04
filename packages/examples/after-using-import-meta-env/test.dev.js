const runTest = require("../_/run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const name = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    `npx cross-env NODE_ENV=development NAME=${name} webpack`,
  ];
  const longRunningCommands = [`node ../_/serve.js -d dist -p ${port}`];
  const expected = `Hello ${name}`;
  const url = `http://localhost:${port}`;
  const waitMs = 2000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
