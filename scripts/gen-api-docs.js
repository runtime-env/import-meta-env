const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  path.resolve(__dirname, "..", "docs", ".api", "cli.md"),
  [
    "## @import-meta-env/cli",
    "",
    "```sh",
    "$ npx import-meta-env --help",
    "```",
    "",
    "```",
    execSync(
      `node ${path.resolve(
        __dirname,
        "..",
        "packages",
        "cli",
        "bin",
        "import-meta-env.js"
      )} --help`
    )
      .toString()
      .trim(),
    "```",
  ].join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.resolve(__dirname, "..", "docs", ".api", "flow.md"),
  [
    "## @import-meta-env/flow",
    "",
    "```sh",
    "$ npx import-meta-env-flow --help",
    "```",
    "",
    "```",
    execSync(
      `node ${path.resolve(
        __dirname,
        "..",
        "packages",
        "flow",
        "bin",
        "import-meta-env-flow.js"
      )} --help`
    )
      .toString()
      .trim(),
    "```",
  ].join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.resolve(__dirname, "..", "docs", ".api", "prepare.md"),
  [
    "## @import-meta-env/prepare",
    "",
    "```sh",
    "$ npx import-meta-env-prepare --help",
    "```",
    "",
    "```",
    execSync(
      `node ${path.resolve(
        __dirname,
        "..",
        "packages",
        "prepare",
        "bin",
        "import-meta-env-prepare.js"
      )} --help`
    )
      .toString()
      .trim(),
    "```",
  ].join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.resolve(__dirname, "..", "docs", ".api", "typescript.md"),
  [
    "## @import-meta-env/typescript",
    "",
    "```sh",
    "$ npx import-meta-env-typescript --help",
    "```",
    "",
    "```",
    execSync(
      `node ${path.resolve(
        __dirname,
        "..",
        "packages",
        "typescript",
        "bin",
        "import-meta-env-typescript.js"
      )} --help`
    )
      .toString()
      .trim(),
    "```",
  ].join("\n"),
  "utf8"
);

fs.writeFileSync(
  path.resolve(__dirname, "..", "docs", "api.md"),
  [
    "# API",
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "babel.md"),
      "utf8"
    ),
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "cli.md"),
      "utf8"
    ),
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "flow.md"),
      "utf8"
    ),
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "prepare.md"),
      "utf8"
    ),
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "swc.md"),
      "utf8"
    ),
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "typescript.md"),
      "utf8"
    ),
    fs.readFileSync(
      path.resolve(__dirname, "..", "docs", ".api", "unplugin.md"),
      "utf8"
    ),
  ].join("\n"),
  "utf8"
);
