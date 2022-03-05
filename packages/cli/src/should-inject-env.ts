import { placeholderVariants } from "./shared";

export const shouldInjectEnv = (code: string): boolean => {
  return placeholderVariants.some((p) => code.includes(p));
};
