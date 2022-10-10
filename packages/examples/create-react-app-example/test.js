const runTest = require("../run-test");

const commands = [
  "npx rimraf build",
  "node scripts/build.js",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["node ../serve.js -d build -p 4179"];
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
