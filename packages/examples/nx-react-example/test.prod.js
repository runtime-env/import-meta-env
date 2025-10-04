const runTest = require("../_/run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../babel/import-meta-env-babel-test.tgz",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npx nx build",
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`node ../_/serve.js -d dist/apps/app -p ${port}`];
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
