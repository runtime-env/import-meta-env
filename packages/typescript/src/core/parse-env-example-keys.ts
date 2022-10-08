import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "dotenv";
import { red } from "picocolors";

export const parseEnvExampleKeys = (path?: string) => {
  path = resolve(process.cwd(), path ?? ".env.example");
  if (existsSync(path) === false) {
    console.error(
      red("[@import-meta-env/typescript] No .env.example file found.")
    );
    return [];
  }
  const content = readFileSync(path, "utf8");
  const parsed = parse(content);
  const keys = Object.keys(parsed);
  return keys;
};
