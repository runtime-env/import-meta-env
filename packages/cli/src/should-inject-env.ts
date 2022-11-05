import { createScriptPlaceholderRegExp } from "../../shared";

export const shouldInjectEnv = (code: string): boolean => {
  return createScriptPlaceholderRegExp().test(code);
};
