const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const name = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "npx cross-env NODE_ENV=production webpack",
    `npx cross-env NAME=${name} npx import-meta-env -x .env.example`,
  ];
  const longRunningCommands = [`node ../serve.js -d dist -p ${port}`];
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
