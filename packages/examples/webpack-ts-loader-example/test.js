const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec cross-env NODE_ENV=production webpack",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
];
const longRunningCommands = ["pnpm -w serve -- -d dist -p 4199"];
const expected = "Hello: foo";
const url = "http://localhost:4199";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
