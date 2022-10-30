import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "dotenv";
import { red } from "picocolors";

export const resolveEnvExample = ({
  envExampleFilePath,
}: {
  envExampleFilePath: string;
}): readonly string[] => {
  envExampleFilePath = resolve(
    process.cwd(),
    envExampleFilePath ?? ".env.example"
  );
  if (existsSync(envExampleFilePath) === false) {
    console.error(red("[import-meta-env] No .env.example file found."));
    return Object.freeze([]);
  }
  const content = readFileSync(envExampleFilePath, "utf8");
  const parsed = parse(content);
  const keys = Object.keys(parsed);
  return Object.freeze(keys);
};
