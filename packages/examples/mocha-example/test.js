const childProcess = require("child_process");
const colors = require("picocolors");

childProcess.execSync(
  "pnpm exec cross-env HELLO=import-meta-env pnpm exec mocha",
  {
    stdio: "inherit",
  }
);

console.log(colors.green("✔ Test passed!"));
