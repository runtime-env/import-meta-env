const { execSync } = require("child_process");

module.exports = async () => {
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    `npx cross-env HELLO=${hello} cypress run --component --env HELLO=${hello}`,
  ];

  commands.forEach((command) => execSync(command, { stdio: "inherit" }));
};
