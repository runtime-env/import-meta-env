import { placeholderRegExpList } from "./shared";
import serialize from "serialize-javascript";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  let outputCode = code;

  placeholderRegExpList.forEach((regExp) => {
    if (regExp.toString().includes(`"`)) {
      outputCode = outputCode.replace(regExp, `(${serialize(env)})`);
    } else {
      outputCode = outputCode.replace(
        regExp,
        `(${serialize(env).replace(/"/g, '\\"')})`
      );
    }
  });

  return outputCode;
};
