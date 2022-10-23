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
  childProcess.execSync("npm add ../../cli/import-meta-env-cli-test.tgz", {
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
    `npx cross-env HELLO=${hello} import-meta-env -x .env.example.public --output out.js`,
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node out.js").toString().trim();

  // assert
  expect(output).to.equal(`Hello: ${hello}`);
};
