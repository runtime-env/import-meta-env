import glob from "glob";
import { existsSync, lstatSync } from "fs";

export const resolveOutputFileNames = (outputPaths: string[]) => {
  return outputPaths
    .map((path) => glob.sync(path))
    .flat()
    .filter((path) => existsSync(path))
    .filter((path) => lstatSync(path).isFile());
};
