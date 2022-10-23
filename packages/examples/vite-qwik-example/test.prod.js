const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf server dist node_modules/.vite",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "npx qwik build preview",
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public --output dist/**/* server/**/*`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
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
