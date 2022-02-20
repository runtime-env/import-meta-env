import { existsSync } from "fs";
import { resolve } from "path";

export type PackageManager = "npm" | "yarn" | "pnpm" | "unknown";

export const detectPackageManager = (): PackageManager => {
  const pnpmPath = resolve(__dirname, "../../../pnpm-lock.yaml");
  const yarnPath = resolve(__dirname, "../../../yarn.lock");
  const npmPath = resolve(__dirname, "../../../package-lock.json");

  if (existsSync(pnpmPath)) {
    return "pnpm";
  }

  if (existsSync(yarnPath)) {
    return "yarn";
  }

  if (existsSync(npmPath)) {
    return "npm";
  }

  return "unknown";
};
