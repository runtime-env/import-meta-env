const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec vite build",
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
];
const longRunningCommands = ["pnpm exec vite preview --port 4186"];
const expected = [
  "Hello: foo",
  "MODE: production",
  "BASE_URL: /",
  "PROD: true",
  "DEV: false",
  'All: {"HELLO":"foo","BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}',
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
