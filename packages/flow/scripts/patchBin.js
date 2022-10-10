const { readFileSync, writeFileSync } = require("fs");

const filePath = "bin/import-meta-env-flow.js";

const oldContent = readFileSync(filePath, "utf-8");
const newContent = `#!/usr/bin/env node\n${oldContent}`;
writeFileSync(filePath, newContent);
