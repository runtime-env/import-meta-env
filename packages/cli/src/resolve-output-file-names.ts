import { globSync } from "glob";
import { existsSync, lstatSync } from "fs";
import { resolve } from "path";

export const resolveOutputFileNames = (outputPaths: string[]) => {
  return outputPaths
    .map((path) => globSync(path))
    .flat()
    .filter((path) => existsSync(path))
    .filter((path) => lstatSync(path).isFile())
    .map((path) => resolve(path));
};
