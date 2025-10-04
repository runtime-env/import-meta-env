const runTest = require("../run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "npx vue-tsc --noEmit && npx vite build",
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
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
  const waitMs = 1000;

  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
