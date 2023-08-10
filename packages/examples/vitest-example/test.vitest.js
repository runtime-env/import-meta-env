const childProcess = require("child_process");

module.exports = () => {
  // arrange
  childProcess.execSync(
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    {
      stdio: "inherit",
    },
  );

  // act
  childProcess.execSync(
    `npx cross-env HELLO=import-meta-env VITE_PREFIXED_KEY=compile-time vitest run`,
    {
      stdio: "inherit",
    },
  );
};
