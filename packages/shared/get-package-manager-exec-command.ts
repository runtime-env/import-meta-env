import { detectPackageManager } from "./detect-package-manager";

export const getPackageManagerExecCommand = (): string => {
  const packageManager = detectPackageManager();

  switch (packageManager) {
    case "pnpm":
      return "pnpm exec";
    default:
      return "npx";
  }
};
