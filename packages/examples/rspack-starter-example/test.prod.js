const runTest = require("../run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "rspack build",
    `npx cross-env HELLO=${hello} JSON={\\\"hello\\\":\\\"${hello}\\\"} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`node ../_/serve.js -d dist -p ${port}`];
  const expected = `Hello: ${hello}\nJSON: {"hello":"${hello}"}`;
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
