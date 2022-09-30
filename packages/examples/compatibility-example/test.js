const childProcess = require("child_process");
const colors = require("picocolors");
const runTest = require("../run-test");

(async () => {
  const commands = [
    "yarn rimraf dist .env",
    "yarn cross-env NODE_ENV=production yarn webpack",
    "echo HELLO=something-with-a-#-hash > .env",
    "yarn final-env --example .env.example.public",
  ];
  const waitMs = 1000;

  await runTest({
    commands: ["yarn add -D dotenv@^16", ...commands],
    longRunningCommands: ["pnpm -w serve -d dist -p 4201"],
    expected: "Hello: something-with-a-",
    url: "http://localhost:4201",
    waitMs,
    noExit: true,
  });

  await runTest({
    commands: ["yarn add -D dotenv@^12", ...commands],
    longRunningCommands: ["pnpm -w serve -d dist -p 4202"],
    expected: "Hello: something-with-a-#-hash",
    url: "http://localhost:4202",
    waitMs,
    noExit: true,
  });

  childProcess.execSync("yarn rimraf .env", { stdio: "inherit" });
  childProcess.execSync("yarn add dotenv", { stdio: "inherit" });
  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
