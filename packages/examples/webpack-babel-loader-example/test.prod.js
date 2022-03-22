const childProcess = require("child_process");
const { expect } = require("chai");

module.exports = () => {
  // arrange
  childProcess.execSync("pnpm exec rimraf dist", {
    stdio: "inherit",
  });
  childProcess.execSync("pnpm exec cross-env NODE_ENV=production webpack", {
    stdio: "inherit",
  });

  // act
  childProcess.execSync(
    "pnpm exec cross-env HELLO=foo import-meta-env --example .env.example.public",
    {
      stdio: "inherit",
    }
  );
  const output = childProcess.execSync("node dist/main.js").toString().trim();

  // assert
  expect(output).to.equal("Hello: foo");
};
