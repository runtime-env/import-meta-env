const runTest = require("../run-test");

const commands = [
  "yarn rimraf dist",
  "yarn vue-cli-service build",
  "yarn cross-env HELLO=foo yarn import-meta-env --example .env.example.public",
];
const longRunningCommands = ["pnpm -w run serve -d dist -p 4175"];
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
