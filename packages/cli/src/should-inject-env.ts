import { placeholderRegExpList } from "./shared";

export const shouldInjectEnv = (code: string): boolean => {
  return placeholderRegExpList.some((regExp) => regExp.test(code));
};
