const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  childProcess.execSync("pnpm exec rimraf out.js*", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    "pnpm exec cross-env HELLO=foo node esbuild.config.js",
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node out.js").toString().trim();

  // assert
  expect(output).to.equal("Hello: foo");
};
