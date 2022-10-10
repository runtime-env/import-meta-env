const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx cross-env NODE_ENV=production rollup -c",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
  "cp public/index.html dist/index.html",
];
const longRunningCommands = ["node ../serve.js -d dist -p 4184"];
const expected = "Hello: foo";
const url = "http://localhost:4184";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
