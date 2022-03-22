const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf custom-out-dir",
  "pnpm exec vite build",
  'pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public --output "custom-out-dir/**/*"',
];
const longRunningCommands = ["pnpm exec vite preview --port 4188"];
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
