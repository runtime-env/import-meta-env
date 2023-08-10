import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "dotenv";

export const resolveEnvExampleKeys = ({
  envExampleFilePath,
}: {
  envExampleFilePath: string;
}): readonly string[] => {
  envExampleFilePath = resolve(process.cwd(), envExampleFilePath);
  if (existsSync(envExampleFilePath) === false) {
    throw ReferenceError(
      `[import-meta-env] failed to load file content from "${envExampleFilePath}".`,
    );
  }
  const content = readFileSync(envExampleFilePath, "utf8");
  const parsed = parse(content);
  const keys = Object.keys(parsed);
  return Object.freeze(keys);
};
