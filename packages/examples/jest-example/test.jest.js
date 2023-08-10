const childProcess = require("child_process");

module.exports = () => {
  // arrange
  childProcess.execSync("npm add ../../babel/import-meta-env-babel-test.tgz", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    `npx cross-env HELLO=import-meta-env jest --no-cache ./**/*.test.ts`,
    {
      stdio: "inherit",
    },
  );
};
