const runTest = require("../_/run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist",
    "npm add ../../swc/import-meta-env-swc-test.tgz",
    `echo HELLO=${hello}\\\\\\nJSON={\\"hello\\":\\"${hello}\\"} > .env`,
    `npx cross-env NODE_ENV=development rollup -c`,
  ];
  const longRunningCommands = [`node ../_/serve.js -d public -p ${port}`];
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
