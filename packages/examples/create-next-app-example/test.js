const runTest = require("../run-test");

const commands = [
  "npx rimraf .next",
  "npx next build",
  "npx cross-env HELLO=foo import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx next start --port 4177"];
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
