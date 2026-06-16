import { globSync } from "glob";
import { lstatSync } from "fs";
import { resolve } from "path";

export const resolveOutputFileNames = (outputPaths: string[]) => {
  return outputPaths
    .map((path) => globSync(path))
    .flat()
    .filter((path) => {
      try {
        return lstatSync(path).isFile();
      } catch {
        return false;
      }
    })
    .map((path) => resolve(path));
};
