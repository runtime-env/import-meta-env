const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx nuxt generate",
  "npx cross-env HELLO=foo import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx nuxt start --port 4178"];
const expected = "Hello: foo";
const url = "http://localhost:4178";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
