const childProcess = require("child_process");
const getPort = require("../_/get-port");
const { copyFileSync, rmSync } = require("fs");
const colors = require("picocolors");

(async () => {
  const port = await getPort();
  const hello = Math.random();
  copyFileSync(
    "../../cli/import-meta-env-cli-test.tgz",
    "./import-meta-env-cli-test.tgz"
  );
  copyFileSync(
    "../../unplugin/import-meta-env-unplugin-test.tgz",
    "./import-meta-env-unplugin-test.tgz"
  );
  copyFileSync("../_/run-test.js", "./run-test.js");
  const runTest = require("./run-test");

  const commands = [];
  const longRunningCommands = [
    `npx cross-env PORT=${port} HELLO=${hello} docker compose up`,
  ];
  const expected = `Hello: ${hello}`;
  const url = `http://localhost:${port}`;
  const waitMs = 60000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });

  childProcess.execSync(`npx cross-env PORT=${port} docker compose down`, {
    stdio: "inherit",
  });
  rmSync("./run-test.js");

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
