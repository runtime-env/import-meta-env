const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env HELLO=${hello} vue-cli-service serve --port ${port}`,
  ];
  const expected = `Hello: ${hello}`;
  const url = `http://localhost:${port}`;
  const waitMs = 6000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
