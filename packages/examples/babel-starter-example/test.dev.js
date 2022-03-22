const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  childProcess.execSync("pnpm exec rimraf dist", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    "pnpm exec cross-env HELLO=foo ./node_modules/.bin/babel src --out-dir dist",
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal("Hello: foo");
};
