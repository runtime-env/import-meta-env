const childProcess = require("child_process");
const colors = require("picocolors");

childProcess.execSync(
  "pnpm exec cross-env HELLO=final-env pnpm exec vitest run",
  {
    stdio: "inherit",
  }
);

console.log(colors.green("✔ Test passed!"));
