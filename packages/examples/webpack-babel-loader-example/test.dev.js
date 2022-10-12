const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  childProcess.execSync("npm add ../../babel/import-meta-env-babel-test.tgz", {
    stdio: "inherit",
  });
  childProcess.execSync("npx rimraf dist", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    `npx cross-env HELLO=${hello} NODE_ENV=development webpack`,
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/main.js").toString().trim();

  // assert
  expect(output).to.equal(`Hello: ${hello}`);
};
