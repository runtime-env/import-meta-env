import { placeholder } from "../../../shared";

const builtInEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD", "SSR", "LEGACY"];

export function preserveViteBuiltInEnv({
  code,
  envPrefix,
}: {
  code: string;
  envPrefix: undefined | string | string[];
}) {
  builtInEnvKeys.forEach((key) => {
    code = code.replace(
      new RegExp(`\\(${placeholder}\\)\.${key}`, "g"),
      `import.meta.env.${key}`
    );
  });

  const normalizedEnPrefix = (() => {
    if (envPrefix === void 0) {
      return ["VITE_"];
    } else if (typeof envPrefix === "string") {
      return [envPrefix];
    } else {
      return envPrefix;
    }
  })();
  normalizedEnPrefix.forEach((prefix) => {
    code = code.replace(
      new RegExp(`\\(${placeholder}\\)\.${prefix}`, "g"),
      `import.meta.env.${prefix}`
    );
  });

  code = code.replace(
    new RegExp(`\\(${placeholder}\\)([^.])`, "g"),
    `({...(${placeholder}),...import.meta.env})$1`
  );
  code = code.replace(
    new RegExp(`\\(${placeholder}\\)$`, "g"),
    `({...(${placeholder}),...import.meta.env})`
  );

  return code;
}
