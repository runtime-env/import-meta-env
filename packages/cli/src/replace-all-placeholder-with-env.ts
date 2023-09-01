import serialize from "serialize-javascript";
import { createScriptPlaceholderRegExp } from "./constant";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  const escapedEnv: Record<string, string> = {};
  for (const key of Object.keys(env)) {
    escapedEnv[key] = env[key].replace(/"/g, '\\"')
  }
  return code
    .replace(
      createScriptPlaceholderRegExp({
        doubleQuoteSlashCount: 2,
        singleQuoteSlashCount: 1,
      }),
      `JSON.parse(\\'${serialize(escapedEnv).replace(/"/g, '\\\\"')}\\')`,
    )
    .replace(
      createScriptPlaceholderRegExp({
        doubleQuoteSlashCount: 1,
        singleQuoteSlashCount: 0,
      }),
      `JSON.parse('${serialize(escapedEnv).replace(/"/g, '\\"')}')`,
    )
    .replace(
      createScriptPlaceholderRegExp({
        doubleQuoteSlashCount: 0,
        singleQuoteSlashCount: 0,
      }),
      `JSON.parse('${serialize(escapedEnv)}')`,
    );
};
