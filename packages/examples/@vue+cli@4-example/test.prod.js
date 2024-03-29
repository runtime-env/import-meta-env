const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../babel/import-meta-env-babel-test.tgz",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npx vue-cli-service build",
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`node ../serve.js -d dist -p ${port}`];
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
