const runTest = require("../_/run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "npx vite build",
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public -p "custom-out-dir/**/*"`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
  const expected = `Hello: ${hello}`;
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
