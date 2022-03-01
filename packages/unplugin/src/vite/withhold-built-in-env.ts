import { uniqueVariableName } from "../../../shared";

const builtInEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD", "SSR", "LEGACY"];

export function withholdViteBuiltInEnv(code: string) {
  builtInEnvKeys.forEach((key) => {
    code = code.replace(
      new RegExp(uniqueVariableName + `.${key}`, "g"),
      `import.meta.env.${key}`
    );
  });

  return code;
}
