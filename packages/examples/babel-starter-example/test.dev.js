const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  childProcess.execSync("npx rimraf dist", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    "npx cross-env HELLO=foo ./node_modules/.bin/babel src --out-dir dist",
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal("Hello: foo");
};
