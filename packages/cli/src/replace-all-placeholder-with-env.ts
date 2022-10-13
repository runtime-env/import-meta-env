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
    if (
      regExp.toString().includes(`"var import_meta_env={};import_meta_env"`)
    ) {
      outputCode = outputCode.replace(
        regExp,
        `eval("(${serialize(env).replace(/"/g, '\\"')})")`
      );
    } else {
      outputCode = outputCode.replace(regExp, `eval('(${serialize(env)})')`);
    }
  });

  return outputCode;
};
