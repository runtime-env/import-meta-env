const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  const secret = Math.random();
  childProcess.execSync("npx rimraf dist .env", {
    stdio: "inherit",
  });
  childProcess.execSync(
    `echo "HELLO=${hello}\nSECRET1=${secret}\nSECRET2=${secret}" > .env`,
    {
      stdio: "inherit",
    }
  );
  childProcess.execSync("npm add ../../swc/import-meta-env-swc-test.tgz", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(`npx cross-env SWC_ENV=development swc src -d dist`, {
    stdio: "inherit",
  });
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal(
    `All: {"HELLO":"${hello}"}\nHello: ${hello}\nSecret1: undefined\nSecret2: undefined`
  );
};
