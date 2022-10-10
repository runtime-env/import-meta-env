const runTest = require("../run-test");

const commands = [
  "npx rimraf dist",
  "npx vite build",
  "npx cross-env HELLO=foo npx import-meta-env --example .env.example.public",
];
const longRunningCommands = ["npx vite preview --port 4196"];
const expected = [
  "jsx named: foo",
  "",
  "jsx named spec: foo",
  "",
  "jsx: foo",
  "",
  "tsx: foo",
  "",
  "jsx script: foo",
  "",
  "src import: foo",
].join("\n");
const url = "http://localhost:4196";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
