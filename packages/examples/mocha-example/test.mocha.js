const childProcess = require("child_process");

module.exports = () => {
  // arrange
  childProcess.execSync("npx rimraf node_modules/.cache", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../babel/import-meta-env-babel-test.tgz", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(`npx cross-env HELLO=import-meta-env mocha`, {
    stdio: "inherit",
  });
};
