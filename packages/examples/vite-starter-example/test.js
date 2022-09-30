const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec vite build",
  "pnpm exec cross-env FOO=1 BAR=2 pnpm exec final-env --example .env.example.public",
];
const longRunningCommands = ["pnpm exec vite preview --port 4192"];
const expected = 'Foo: 1\nBar: 2\nAll: {"FOO":"1","BAR":"2"}';
const url = "http://localhost:4192";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
