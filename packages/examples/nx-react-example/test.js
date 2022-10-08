const runTest = require('../run-test');

const commands = [
  'npx rimraf dist',
  'npx nx build',
  'npx cross-env HELLO=foo npx import-meta-env --example .env.example.public',
];
const longRunningCommands = [
  'node ../../../scripts/serve -d dist/apps/app -p 4207',
];
const expected = 'Hello: foo';
const url = 'http://localhost:4207';
const waitMs = 1000;

runTest({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
});
