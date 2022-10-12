const runTest = require("../run-test");

module.exports = async () => {
  const hello = Math.random();
  const commands = [
    "npx rimraf build node_modules/.cache",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env HELLO=${hello} node scripts/start.js`,
  ];
  const expected = `Hello: ${hello}`;
  const url = `http://localhost:3000`;
  const waitMs = 10000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    waitUntil: "networkidle2",
    noExit: true,
  });
};
