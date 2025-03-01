const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();
  const compileTime = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env HELLO=${hello} VITE_PREFIXED_KEY=${compileTime} vite dev --port ${port}`,
  ];
  const expected = [
    `Hello: ${hello}`,
    `Vite Prefixed key: ${compileTime}`,
    "MODE: development",
    "BASE_URL: /",
    "PROD: false",
    "DEV: true",
  ].join("\n");
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
