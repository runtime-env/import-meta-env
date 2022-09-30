const runTest = require("../run-test");

const commands = [
  "yarn rimraf dist",
  "yarn nuxt generate",
  "yarn cross-env HELLO=foo final-env --example .env.example.public",
];
const longRunningCommands = ["yarn nuxt start --port 4178"];
const expected = "Hello: foo";
const url = "http://localhost:4178";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
