const runTest = require("../_/run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env HELLO=${hello} vite dev --port ${port}`,
  ];
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
