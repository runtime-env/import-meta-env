const runTest = require("../run-test");

const commands = [
  "pnpm exec rimraf dist",
  "pnpm exec vite build",
  "pnpm exec cross-env HELLO=foo pnpm exec final-env --example .env.example.public",
];
const longRunningCommands = ["pnpm exec vite preview --port 4196"];
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
