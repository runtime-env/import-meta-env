const runTest = require("../run-test");
const getPort = require("../_/get-port");

module.exports = async () => {
  const port = await getPort();
  const port2 = await getPort();
  const hello = Math.random();
  const hello2 = Math.random();

  const commands = [
    "npx rimraf node_modules/.cache",
    "cd app1 && npx rimraf dist",
    "cd app1 && npm add ../../../babel/import-meta-env-babel-test.tgz",
    "cd app2 && npx rimraf dist",
    "cd app2 && npm add ../../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `cd app1 && npx cross-env NODE_ENV=development PORT=${port} PORT2=${port2} HELLO=${hello} webpack serve`,
    `cd app2 && npx cross-env NODE_ENV=development PORT2=${port2} HELLO2=${hello2} webpack serve`,
  ];
  const expected = `Hello: ${hello}\nHello2: ${hello2}`;
  const url = `http://localhost:${port}`;
  const waitMs = 3000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
