const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec webpack",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public --compression compression.js",
];
const longRunningCommands = ["pnpm -w serve -- -d dist -p 4198 --br"];
const expected = "Hello: foo";
const url = "http://localhost:4198";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
