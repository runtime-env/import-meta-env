const runTest = require("../run-test");

const commands = [
  "npx rimraf .next",
  "npx next build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = [
  "npx cross-env SECRET_NUMBER=bar npx next start -p 4183",
];
const expected = [
  'import.meta.\x00env: {"HELLO":"foo"}',
  "",
  'process.env: {"SECRET_NUMBER":"bar"}',
].join("\n");
const url = "http://localhost:4183";
const waitMs = 3000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
