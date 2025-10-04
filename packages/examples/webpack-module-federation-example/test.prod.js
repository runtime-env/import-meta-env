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
    "cd app1 && npm add ../../../cli/import-meta-env-cli-test.tgz",
    `cd app1 && npx cross-env NODE_ENV=production PORT2=${port2} webpack`,
    `cd app1 && npx cross-env HELLO=${hello} HELLO2=${hello2} import-meta-env -x ../.env.example.public`,
    "cd app2 && npx rimraf dist",
    "cd app2 && npm add ../../../unplugin/import-meta-env-unplugin-test.tgz",
    `cd app2 && npx cross-env NODE_ENV=production webpack`,
  ];
  const longRunningCommands = [
    `node ../_/serve.js -d app2/dist -p ${port2}`,
    `node ../_/serve.js -d app1/dist -p ${port}`,
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
