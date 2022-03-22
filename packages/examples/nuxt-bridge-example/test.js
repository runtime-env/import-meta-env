const runTest = require("../run-test");

const commands = [
  "yarn rimraf .nuxt .output",
  "yarn nuxi build",
  "yarn cross-env HELLO=foo yarn import-meta-env --example .env.example.public",
];
const longRunningCommands = ["yarn cross-env PORT=4182 nuxi preview"];
const expected = "Hello: foo";
const url = "http://localhost:4182";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
