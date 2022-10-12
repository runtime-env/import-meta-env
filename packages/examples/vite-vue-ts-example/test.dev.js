const runTest = require("../run-test");
const getPort = require("../get-port");

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
  const expected = [
    `Js: ${hello}`,
    "",
    `Js with setup: ${hello}`,
    "",
    `HTML: ${hello}`,
    "",
    `HTML with setup: ${hello}`,
    "",
    `Pug: ${hello}`,
    "",
    `Pug with setup: ${hello}`,
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
