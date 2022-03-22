import runTest from "../run-test.js";

const commands = [
  "pnpm exec rimraf .svelte-kit",
  "pnpm exec svelte-kit build",
  'pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public --output ".svelte-kit/output/**"',
];
const longRunningCommands = ["pnpm exec svelte-kit preview --port 4185"];
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
