const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec webpack",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public --compression-module compression.js",
];
const longRunningCommands = ["pnpm -w serve -- -d dist -p 4203 --br"];
const expected = "Hello: foo";
const url = "http://localhost:4203";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
