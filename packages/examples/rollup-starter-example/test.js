const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec rollup -c",
  "pnpm exec cross-env FOO=1 BAR=2 pnpm exec final-env --example .env.example.public",
  "cp public/index.html dist/index.html",
];
const longRunningCommands = ["pnpm -w serve -d dist -p 4184"];
const expected = 'Foo: 1\nBar: 2\nAll: {"FOO":"1","BAR":"2"}';
const url = "http://localhost:4184";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
