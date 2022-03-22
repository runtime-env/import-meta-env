const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf .next",
  "pnpm exec next build",
  "pnpm exec cross-env HELLO=foo import-meta-env --example .env.example.public",
];
const longRunningCommands = ["pnpm exec next start --port 4177"];
const expected = "Hello: foo";
const url = "http://localhost:4177";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
