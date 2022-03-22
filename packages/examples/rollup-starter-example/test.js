const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec rollup -c",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
  "cp public/index.html dist/index.html",
];
const longRunningCommands = ["pnpm -w serve -- -d dist -p 4184"];
const expected = "Hello: foo";
const url = "http://localhost:4184";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
