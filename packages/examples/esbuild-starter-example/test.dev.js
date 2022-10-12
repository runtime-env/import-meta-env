const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  const hello = Math.random();
  childProcess.execSync("npx rimraf out.js*", {
    stdio: "inherit",
  });
  childProcess.execSync(
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
    {
      stdio: "inherit",
    }
  );

  // act
  childProcess.execSync(`npx cross-env HELLO=${hello} node esbuild.config.js`, {
    stdio: "inherit",
  });
  const output = childProcess.execSync("node out.js").toString().trim();

  // assert
  expect(output).to.equal(`Hello: ${hello}`);
};
