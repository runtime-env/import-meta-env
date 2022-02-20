// set -e

// # set up
// rm -rf dist

// # act
// pnpm run build
// pnpm exec import-meta-env

// # assert
// diff -r dist __dist__

const os = require("os");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const rimraf = require("rimraf");

// set up
rimraf.sync("dist");

// act
child_process.execSync("pnpm run build");
child_process.execSync("pnpm exec import-meta-env");

// assert
const expectedFileDir = path.resolve(__dirname, "__dist__");
const expectedFilePaths = collectFilePaths(expectedFileDir);
const actualFileDir = path.resolve(__dirname, "dist");
const actualFilePaths = collectFilePaths(actualFileDir);

const expectedFileRelPaths = mapRelativePaths(
  expectedFileDir,
  expectedFilePaths
);
const actualFileRelPaths = mapRelativePaths(actualFileDir, actualFilePaths);
if (
  JSON.stringify(expectedFileRelPaths) !== JSON.stringify(actualFileRelPaths)
) {
  throw Error(
    [
      "file added or removed:",
      `expectedFilePaths: ${JSON.stringify(expectedFileRelPaths, null, 2)}`,
      `actualFilePaths: ${JSON.stringify(actualFileRelPaths, null, 2)}`,
    ].join("\n")
  );
}

expectedFilePaths.forEach((expectedFilePath) => {
  const relativePath = path.relative(expectedFileDir, expectedFilePath);
  const actualFilePath = path.resolve(actualFileDir, relativePath);
  const actualFileContent = normalizeEOF(
    fs.readFileSync(actualFilePath, "utf8")
  );
  const expectedFileContent = normalizeEOF(
    fs.readFileSync(expectedFilePath, "utf8")
  );
  if (actualFileContent !== expectedFileContent) {
    throw Error(
      [
        "content added or removed:",
        "<",
        `${actualFileContent
          .split(os.EOL)
          .map((l) => ">\t" + l)
          .join(os.EOL)}`,
        "---",
        `${expectedFileContent
          .split(os.EOL)
          .map((l) => "<\t" + l)
          .join(os.EOL)}`,
        ">",
      ].join(os.EOL)
    );
  }
});

console.log("Pass!");

/**
 * @param {string} dir
 * @returns {string[]}
 */
function collectFilePaths(dir) {
  const files = fs.readdirSync(dir);
  const result = [];
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      result.push(...collectFilePaths(filePath));
    } else {
      result.push(filePath);
    }
  }
  return result;
}

/**
 * @param {string} dir
 * @param {string[]} filePaths
 * @returns {string[]}
 */
function mapRelativePaths(dir, filePaths) {
  return filePaths.map((filePath) => path.relative(dir, filePath));
}

/**
 * @param {string} s
 * @returns {string}
 */
function normalizeEOF(s) {
  return s.replace(/\r\n/g, "\n");
}
