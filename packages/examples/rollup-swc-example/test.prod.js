const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../swc/import-meta-env-swc-test.tgz",
    `npx cross-env NODE_ENV=production rollup -c`,
    "cp public/index.html dist/index.html",
    `echo HELLO=${hello} > .env`,
    `npx cross-env npx import-meta-env -x .env.example.public`,
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
