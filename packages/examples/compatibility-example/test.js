const childProcess = require("child_process");
const colors = require("picocolors");
const runTest = require("../run-test");

(async () => {
  const commands = [
    "npx rimraf dist .env",
    "npx cross-env NODE_ENV=production webpack",
    "echo HELLO=something-with-a-#-hash > .env",
    "npx import-meta-env --example .env.example.public",
  ];
  const waitMs = 1000;

  await runTest({
    commands: ["npm add -D dotenv@^15", ...commands],
    longRunningCommands: ["node ../serve.js -d dist -p 4201"],
    expected: "Hello: something-with-a-",
    url: "http://localhost:4201",
    waitMs,
    noExit: true,
  });

  await runTest({
    commands: ["npm add -D dotenv@^12", ...commands],
    longRunningCommands: ["node ../serve.js -d dist -p 4202"],
    expected: "Hello: something-with-a-#-hash",
    url: "http://localhost:4202",
    waitMs,
    noExit: true,
  });

  childProcess.execSync("npx rimraf .env", { stdio: "inherit" });
  childProcess.execSync("npm add -D dotenv@^15", { stdio: "inherit" });
  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
