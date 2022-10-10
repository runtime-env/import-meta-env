const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  childProcess.execSync("npx rimraf out.js*", {
    stdio: "inherit",
  });
  childProcess.execSync(
    "npx cross-env NODE_ENV=production node esbuild.config.js",
    {
      stdio: "inherit",
    }
  );

  // act
  childProcess.execSync(
    "npx cross-env HELLO=foo import-meta-env --example .env.example.public --output out.js",
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node out.js").toString().trim();

  // assert
  expect(output).to.equal("Hello: foo");
};
