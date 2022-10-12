const childProcess = require("child_process");
const getPort = require("../get-port");
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
  copyFileSync("../run-test.js", "./run-test.js");
  const runTest = require("./run-test");

  const image = "import-meta-env-docker-starter-example";
  childProcess.execSync(`docker build -t ${image} .`, {
    stdio: "inherit",
  });
  const containerId = childProcess
    .execSync(`docker run -d -p ${port}:80 --env HELLO=${hello} ${image}`)
    .toString()
    .trim();

  const commands = [];
  const longRunningCommands = [];
  const expected = `Hello: ${hello}`;
  const url = `http://localhost:${port}`;
  const waitMs = 1000;
  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });

  childProcess.execSync(`docker kill ${containerId}`, {
    stdio: "inherit",
  });
  childProcess.execSync(`docker rm ${containerId}`, {
    stdio: "inherit",
  });
  childProcess.execSync(`docker image rm ${image}`, {
    stdio: "inherit",
  });
  rmSync("./run-test.js");

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
