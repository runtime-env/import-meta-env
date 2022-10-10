const childProcess = require("child_process");
const colors = require("picocolors");

childProcess.execSync("npx cross-env HELLO=import-meta-env npx mocha", {
  stdio: "inherit",
});

console.log(colors.green("✔ Test passed!"));
