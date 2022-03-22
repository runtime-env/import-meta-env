const childProcess = require("child_process");
const colors = require("picocolors");
const { expect } = require("chai");

// arrange
childProcess.execSync("pnpm exec rimraf dist", {
  stdio: "inherit",
});
childProcess.execSync("pnpm exec webpack", {
  stdio: "inherit",
});

// act
childProcess.execSync(
  "pnpm exec cross-env HELLO=foo pnpm exec import-meta-env --example .env.example.public",
  {
    stdio: "inherit",
  }
);
const output = childProcess.execSync("node dist/main.js").toString().trim();

// assert
expect(output).to.equal("Hello: foo");

console.log(colors.green("✔ Test passed!"));
