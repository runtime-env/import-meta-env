const runTest = require("../run-test");

const commands = [];
const longRunningCommands = [
  "npx cross-env HELLO=foo VITE_PREFIXED_KEY=compile-time vite dev --port 3001",
];
const expected = [
  "Hello: foo",
  "Prefixed key: compile-time",
  "MODE: development",
  "BASE_URL: /",
  "PROD: false",
  "DEV: true",
  'All: {"HELLO":"foo","VITE_PREFIXED_KEY":"compile-time","BASE_URL":"/","MODE":"development","DEV":true,"PROD":false,"SSR":false}',
].join("\n");
const url = "http://localhost:3001";
const waitMs = 3000;

module.exports = () =>
  runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
