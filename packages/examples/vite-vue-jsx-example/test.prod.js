const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "npx vite build",
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
  const expected = [
    `jsx named: ${hello}`,
    "",
    `jsx named spec: ${hello}`,
    "",
    `jsx: ${hello}`,
    "",
    `tsx: ${hello}`,
    "",
    `jsx script: ${hello}`,
    "",
    `src import: ${hello}`,
  ].join("\n");
  const url = `http://localhost:${port}`;
  const waitMs = 3000;

  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
