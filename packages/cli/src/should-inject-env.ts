import { createPlaceholderRegExp } from "../../shared";

export const shouldInjectEnv = (code: string): boolean => {
  return (
    createPlaceholderRegExp(`\\.\\w+\\b`, "double").test(code) ||
    createPlaceholderRegExp(`\\.\\w+\\b`, "single").test(code)
  );
};
