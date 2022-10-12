const childProcess = require("child_process");
const colors = require("picocolors");
const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist .env",
    "npm add ../../cli/import-meta-env-cli-test.tgz",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    "npx cross-env NODE_ENV=production webpack",
    `echo HELLO=${hello}-with-a-#-hash > .env`,
    "npx import-meta-env --example .env.example.public",
  ];
  const waitMs = 1000;

  await runTest({
    commands: ["npm add -D dotenv@^12", ...commands],
    longRunningCommands: [`node ../serve.js -d dist -p ${port}`],
    expected: `Hello: ${hello}-with-a-#-hash`,
    url: `http://localhost:${port}`,
    waitMs,
    noExit: true,
  });

  childProcess.execSync("npx rimraf .env", { stdio: "inherit" });
  childProcess.execSync("npm add -D dotenv@^15", { stdio: "inherit" });
};
