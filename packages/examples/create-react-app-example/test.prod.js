const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf build node_modules/.cache",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "node scripts/build.js",
    `npx cross-env HELLO=${hello} import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`node ../serve.js -d build -p ${port}`];
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
