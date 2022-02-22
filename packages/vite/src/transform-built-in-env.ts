import { uniqueVariableName } from "./shared";

const inlineEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD", "SSR", "LEGACY"];

export function preserveViteBuiltInEnv(code: string) {
  inlineEnvKeys.forEach((key) => {
    code = code.replace(
      new RegExp(`import.meta.env.${key}`, "g"),
      uniqueVariableName + `.${key}`
    );
  });

  return code;
}

export function restoreViteBuiltInEnv(code: string) {
  inlineEnvKeys.forEach((key) => {
    code = code.replace(
      new RegExp(uniqueVariableName + `.${key}`, "g"),
      `import.meta.env.${key}`
    );
  });

  return code;
}
