const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx ng build",
  "npx cross-env MODE=production HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["node ../serve.js -d dist/angular-example -p 4210"];
const expected = "Hello: foo"
const url = "http://localhost:4210";
const waitMs = 2000;

module.exports = () =>
  runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
