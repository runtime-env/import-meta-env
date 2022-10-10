const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  childProcess.execSync("npx rimraf dist", {
    stdio: "inherit",
  });
  childProcess.execSync("npx cross-env NODE_ENV=production webpack", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    "npx cross-env HELLO=foo import-meta-env --example .env.example.public",
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/main.js").toString().trim();

  // assert
  expect(output).to.equal("Hello: foo");
};
