import { placeholderVariants } from "./shared";

export const replaceAllPlaceholderWithEnv = (
  code: string,
  env: Record<string, string>
): string => {
  let outputCode = code;

  placeholderVariants.forEach((p) => {
    outputCode = outputCode.replace(new RegExp(p, "g"), JSON.stringify(env));
  });

  return outputCode;
};
