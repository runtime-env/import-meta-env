const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec vite build",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
];
const longRunningCommands = ["pnpm exec vite preview --port 4189"];
const expected = ["Hello: foo", "Is legacy? false"].join("\n");
const url = "http://localhost:4189";
const waitMs = 1000;

module.exports = () =>
  runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
