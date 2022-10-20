const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  const secret = Math.random();
  childProcess.execSync("npx rimraf dist .env", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../swc/import-meta-env-swc-test.tgz", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../cli/import-meta-env-cli-test.tgz", {
    stdio: "inherit",
  });
  childProcess.execSync(
    `npx cross-env SWC_ENV=production SECRET1=${secret} swc src -d dist`,
    {
      stdio: "inherit",
    }
  );

  // act
  childProcess.execSync(
    `npx cross-env HELLO=${hello} SECRET2=${secret} import-meta-env --example .env.example.public`,
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
