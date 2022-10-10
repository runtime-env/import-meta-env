const { execSync } = require("child_process");

execSync("pnpm --recursive --aggregate-output run build", { stdio: "inherit" });
