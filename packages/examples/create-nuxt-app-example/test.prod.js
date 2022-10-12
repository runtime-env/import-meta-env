const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf .nuxt dist node_modules/.cache",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../babel/import-meta-env-babel-test.tgz",
    "npx nuxt generate",
    `npx cross-env HELLO=${hello} import-meta-env --example .env.example.public`,
  ];
  const longRunningCommands = [`npx nuxt start --port ${port}`];
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
