const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf build",
  "node scripts/build.js",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
];
const longRunningCommands = ["pnpm -w run serve -- -d build -p 4179"];
const expected = "Hello: foo";
const url = "http://localhost:4179";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
