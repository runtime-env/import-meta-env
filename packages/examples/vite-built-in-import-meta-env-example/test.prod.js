const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();
  const compileTime = Math.random();
  const runtime = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    `npx cross-env VITE_PREFIXED_KEY=${compileTime} vite build`,
    `npx cross-env HELLO=${hello} VITE_PREFIXED_KEY=${runtime} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
  const expected = [
    `Hello: ${hello}`,
    `Vite Prefixed key: ${compileTime}`,
    "MODE: production",
    "BASE_URL: /",
    "PROD: true",
    "DEV: false",
    `All: {"VITE_PREFIXED_KEY":"${compileTime}","BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}`,
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
