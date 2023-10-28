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
    escapedEnv[key] = env[key].replace(/"/g, '\\"');
  }
  return code.replace(createScriptPlaceholderRegExp(), serialize(escapedEnv));
};
