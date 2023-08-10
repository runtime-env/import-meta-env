const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  childProcess.execSync("npx rimraf dist", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../babel/import-meta-env-babel-test.tgz", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    `npx cross-env HELLO=${hello} ./node_modules/.bin/babel src --out-dir dist`,
    {
      stdio: "inherit",
    },
  );
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal(`Hello: ${hello}`);
};
