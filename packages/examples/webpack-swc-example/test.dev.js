const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../swc/import-meta-env-swc-test.tgz",
    `echo "HELLO=${hello}" > .env`,
    `npx cross-env NODE_ENV=development webpack`,
  ];
  const longRunningCommands = [`node ../serve.js -d dist -p ${port}`];
  const expected = `Hello: ${hello}`;
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
