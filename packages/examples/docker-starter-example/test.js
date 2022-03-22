const childProcess = require("child_process");
const { copyFileSync, rmSync } = require("fs");
const colors = require("picocolors");

(async () => {
  copyFileSync("../run-test.js", "./run-test.js");
  const runTest = require("./run-test");

  const image = "import-meta-env-docker-starter-example";
  childProcess.execSync(`docker build -t ${image} .`, {
    stdio: "inherit",
  });
  const containerId = childProcess
    .execSync(`docker run -d -p 4181:80 --env HELLO=foo ${image}`)
    .toString()
    .trim();

  const commands = [];
  const longRunningCommands = [];
  const expected = "Hello: foo";
  const url = "http://localhost:4181";
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
