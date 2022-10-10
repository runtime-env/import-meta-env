const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx cross-env VITE_PREFIXED_KEY=compile-time vite build",
  "npx cross-env HELLO=foo VITE_PREFIXED_KEY=runtime npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx vite preview --port 4186"];
const expected = [
  "Hello: foo",
  "Prefixed key: compile-time",
  "MODE: production",
  "BASE_URL: /",
  "PROD: true",
  "DEV: false",
  'All: {"HELLO":"foo","VITE_PREFIXED_KEY":"compile-time","BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}',
].join("\n");
const url = "http://localhost:4186";
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
