const runTest = require("../run-test");

const commands = [];
const longRunningCommands = [
  "npx cross-env MODE=development HELLO=foo ng serve --port 4209",
];
const expected = "Hello: foo"
const url = "http://localhost:4209";
const waitMs = 10000;

module.exports = () =>
  runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
