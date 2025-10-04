const runTest = require("../_/run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist .angular node_modules/.cli-ngcc",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env MODE=development HELLO=${hello} ng serve --port ${port}`,
  ];
  const expected = `Hello: ${hello}`;
  const url = `http://localhost:${port}`;
  const waitMs = 10000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
