import glob from "glob";
import { existsSync, lstatSync } from "fs";
import { resolve } from "path";

export const collectFilePathsFromGlobs = (fileGlobs: string[]) => {
  return fileGlobs
    .map((fileGlob) => glob.sync(fileGlob))
    .flat()
    .filter((path) => existsSync(path))
    .filter((path) => lstatSync(path).isFile())
    .map((path) => resolve(path));
};
