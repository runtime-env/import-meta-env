import { createScriptPlaceholderRegExp } from "./constant";

export const shouldInjectEnv = (code: string): boolean => {
  return (
    createScriptPlaceholderRegExp({
      doubleQuoteSlashCount: 2,
      singleQuoteSlashCount: 1,
    }).test(code) ||
    createScriptPlaceholderRegExp({
      doubleQuoteSlashCount: 1,
      singleQuoteSlashCount: 0,
    }).test(code) ||
    createScriptPlaceholderRegExp({
      doubleQuoteSlashCount: 0,
      singleQuoteSlashCount: 0,
    }).test(code)
  );
};
