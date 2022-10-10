const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx vite build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx vite preview --port 4194"];
const expected = "Hello: foo";
const url = "http://localhost:4194";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
