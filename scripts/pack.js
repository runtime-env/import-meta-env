const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const workspaces = yaml.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "pnpm-workspace.yaml"), "utf8"),
).packages;
console.log(workspaces);

workspaces.forEach((p) => {
  execSync(`cd ${path.resolve(__dirname, "..", p)} && pnpm pack `, {
    stdio: "inherit",
  });
});
