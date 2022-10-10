const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx vite build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx vite preview --port 4193"];
const expected = "Hello: foo";
const url = "http://localhost:4193";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
