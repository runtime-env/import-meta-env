const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  const secret = Math.random();
  childProcess.execSync("npx rimraf dist", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../babel/import-meta-env-babel-test.tgz", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    `npx cross-env HELLO=${hello} SECRET1=${secret} SECRET2=${secret} ./node_modules/.bin/babel src --out-dir dist`,
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal(
    `All: {"HELLO":"${hello}"}\nHello: ${hello}\nSecret1: undefined\nSecret2: undefined`
  );
};
