import serialize from "serialize-javascript";
import { createPlaceholderRegExp } from "../../shared";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
  example,
}: {
  code: string;
  env: Record<string, string>;
  example: readonly string[];
}): string => {
  let outputCode = code;

  example.forEach((key) => {
    outputCode = outputCode.replace(
      createPlaceholderRegExp(`\\.${key}\\b`, "double"),
      `${serialize(env[key])}`
    );
    outputCode = outputCode.replace(
      createPlaceholderRegExp(`\\.${key}\\b`, "single"),
      `${serialize(env[key]).replace(/"/g, '\\"')}`
    );
  });

  return outputCode;
};
