const childProcess = require("child_process");
const colors = require("picocolors");

childProcess.execSync("npx cross-env HELLO=import-meta-env npx vitest run", {
  stdio: "inherit",
});

console.log(colors.green("✔ Test passed!"));
