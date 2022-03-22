const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf .next",
  "pnpm exec next build",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
];
const longRunningCommands = [
  "pnpm exec cross-env SECRET_NUMBER=bar pnpm exec next start -p 4183",
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
