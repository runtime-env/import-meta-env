const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx cross-env NODE_ENV=production webpack",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["node ../serve.js -d dist -p 4198"];
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
