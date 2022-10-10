const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx vite build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx vite preview --port 4189"];
const expected = ["Hello: foo", "Is legacy? false"].join("\n");
const url = "http://localhost:4189";
const waitMs = 1000;

module.exports = () =>
  runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
