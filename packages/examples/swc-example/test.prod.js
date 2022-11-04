const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  childProcess.execSync("npx rimraf dist .env", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../swc/import-meta-env-swc-test.tgz", {
    stdio: "inherit",
  });
  childProcess.execSync("npm add ../../cli/import-meta-env-cli-test.tgz", {
    stdio: "inherit",
  });
  childProcess.execSync(`npx cross-env SWC_ENV=production swc src -d dist`, {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    `npx cross-env HELLO=${hello} import-meta-env -x .env.example.public`,
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal(`Hello: ${hello}`);
};
