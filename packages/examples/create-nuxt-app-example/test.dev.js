const runTest = require("../run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf .nuxt dist node_modules/.cache",
    "npm add ../../babel/import-meta-env-babel-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env HELLO=${hello} nuxt --port ${port}`,
  ];
  const expected = `Hello: ${hello}`;
  const url = `http://localhost:${port}`;
  const waitMs = 2000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    waitUntil: "networkidle2",
    waitForSelector: "#__nuxt",
    noExit: true,
  });
};
