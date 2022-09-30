import runTest from "../run-test.js";

const commands = [
  "yarn rimraf .svelte-kit",
  "yarn svelte-kit build",
  'yarn cross-env HELLO=foo yarn final-env --example .env.example.public --output ".svelte-kit/output/**"',
];
const longRunningCommands = ["yarn svelte-kit preview --port 4185"];
const expected = "Hello: foo";
const url = "http://localhost:4185";
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
