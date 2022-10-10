const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx vite build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx vite preview --port 4197"];
const expected = [
  "Js: foo",
  "",
  "Js with setup: foo",
  "",
  "HTML: foo",
  "",
  "HTML with setup: foo",
  "",
  "Pug: foo",
  "",
  "Pug with setup: foo",
].join("\n");
const url = "http://localhost:4197";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
