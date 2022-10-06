const runTest = require("../run-test");

const commands = [
  "npx rimraf .nuxt .output",
  "npx nuxi build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx cross-env PORT=4182 nuxi preview"];
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
