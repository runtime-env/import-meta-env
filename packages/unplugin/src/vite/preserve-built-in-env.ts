import { Replacement } from "../replacement";

export const builtInEnvKeys = [
  "BASE_URL",
  "MODE",
  "DEV",
  "PROD",
  "SSR",
  "LEGACY",
];

export function preserveViteBuiltInEnv({
  envPrefix,
}: {
  envPrefix: undefined | string | string[];
}): Replacement[] {
  let replacements: Replacement[] = [];

  replacements = replacements.concat(
    builtInEnvKeys.map((key) => {
      return {
        regexp: new RegExp(`\\bimport\\.meta\\.env\\.${key}\\b`),
        substitution: `import.meta.env.${key}`,
      };
    })
  );

  const normalizedEnPrefix = (() => {
    if (envPrefix === void 0) {
      return ["VITE_"];
    } else if (typeof envPrefix === "string") {
      return [envPrefix];
    } else {
      return envPrefix;
    }
  })();
  replacements = replacements.concat(
    normalizedEnPrefix.map((prefix) => {
      return {
        regexp: new RegExp(`\\bimport\\.meta\\.env\\.${prefix}`),
        substitution: `import.meta.env.${prefix}`,
      };
    })
  );

  return replacements;
}
