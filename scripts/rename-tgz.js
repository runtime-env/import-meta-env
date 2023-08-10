const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"),
);
const name = pkg.name
  .replace(/[^a-z-/]/g, "")
  .replace("/", "-")
  .toLowerCase();
const version = pkg.version;
const oldTgzName = name + "-" + version + ".tgz";
const newTgzName = name + "-" + "test" + ".tgz";

fs.renameSync(oldTgzName, newTgzName);
console.log(`Rename ${oldTgzName} to ${newTgzName}.`);
