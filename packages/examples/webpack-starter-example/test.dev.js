const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const title = Math.random();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.cache",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    `npx cross-env NODE_ENV=development TITLE=${title} HELLO=${hello} webpack`,
  ];
  const longRunningCommands = [`node ../serve.js -d dist -p ${port}`];
  const expected = `Title: ${title}\nHello: ${hello}`;
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
