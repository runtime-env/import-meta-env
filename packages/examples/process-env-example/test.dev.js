const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();
  const secret1 = Math.random();
  const secret2 = Math.random();

  const commands = [
    "npx rimraf .next",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  const longRunningCommands = [
    `npx cross-env HELLO=${hello} SECRET1=${secret1} SECRET2=${secret2} next dev --port ${port}`,
  ];
  const expected = [
    `import.meta.\0env.HELLO: ${hello}`,
    `import.meta.\0env.SECRET1:`,
    `import.meta.\0env.SECRET2:`,
    `process.env: {"SECRET1":"${secret1}","SECRET2":"${secret2}"}`,
    `process.env.SECRET1: ${secret1}`,
    `process.env.SECRET2: ${secret2}`,
  ].join("\n");
  const url = `http://localhost:${port}`;
  const waitMs = 5000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
