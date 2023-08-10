const runTest = require("../run-test");
const getPort = require("../get-port");
const { writeFileSync, readFileSync } = require("fs");
const { execSync } = require("child_process");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  execSync("npx rimraf dist node_modules/.vite", { stdio: "inherit" });
  execSync("npm add ../../cli/import-meta-env-cli-test.tgz", {
    stdio: "inherit",
  });
  execSync("npm add ../../unplugin/import-meta-env-unplugin-test.tgz", {
    stdio: "inherit",
  });
  execSync("npx vite build", { stdio: "inherit" });

  writeFileSync(
    "dist/index.html",
    readFileSync("dist/index.html", "utf8")
      .replace(/.*type="module".*/g, "")
      .replace(/nomodule/g, ""),
  );
  const commands = [
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
  const expected = `Hello: ${hello}\nIs legacy? true`;
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
};
