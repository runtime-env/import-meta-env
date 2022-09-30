const childProcess = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const runTest = require("../run-test");

const commands = [];
const longRunningCommands = ["pnpm exec vite preview --port 4203"];
const expected = ["Hello: foo", "Is legacy? true"].join("\n");
const url = "http://localhost:4203";
const waitMs = 1000;

module.exports = () => {
  childProcess.execSync("pnpm exec rimraf dist", { stdio: "inherit" });
  childProcess.execSync("pnpm exec vite build", { stdio: "inherit" });
  childProcess.execSync(
    "pnpm exec cross-env HELLO=foo pnpm exec final-env --example .env.example.public",
    { stdio: "inherit" }
  );
  writeFileSync(
    "dist/index.html",
    readFileSync("dist/index.html", "utf8")
      .replace(
        '<script type="module" crossorigin src="/assets/index.js"></script>',
        ""
      )
      .replace("<script nomodule", "<script ")
      .replace("<script nomodule", "<script ")
      .replace("<script nomodule", "<script ")
  );

  return runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
