const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  childProcess.execSync("npx rimraf dist .env", {
    stdio: "inherit",
  });
  childProcess.execSync(
    `echo "HELLO=${hello}\nJSON={\\"hello\\\":\\\"${hello}\\\"}" > .env`,
    {
      stdio: "inherit",
    },
  );
  childProcess.execSync("npm add ../../swc/import-meta-env-swc-test.tgz", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    `npx cross-env SWC_ENV=development swc src -o dist/index.js -s true`,
    {
      stdio: "inherit",
    },
  );
  const output = childProcess.execSync("node dist/index.js").toString().trim();

  // assert
  expect(output).to.equal(`Hello: ${hello}\nJSON: {"hello":"${hello}"}`);
};
