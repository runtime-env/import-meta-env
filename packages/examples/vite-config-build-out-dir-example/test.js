const runTest = require("../run-test");

const commands = [
  "npx rimraf custom-out-dir",
  "npx vite build",
  'npx cross-env HELLO=foo npx import-meta-env --example .env.example.public --output "custom-out-dir/**/*"',
];
const longRunningCommands = ["npx vite preview --port 4188"];
const expected = "Hello: foo";
const url = "http://localhost:4188";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
