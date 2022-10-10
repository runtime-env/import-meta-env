const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx vue-cli-service build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["node ../serve.js -d dist -p 4175"];
const expected = "Hello: foo";
const url = "http://localhost:4175";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
