import { placeholder } from "./shared";
import serialize from "serialize-javascript";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  let outputCode = code;

  Object.keys(env).forEach((key) => {
    outputCode = outputCode.replace(
      new RegExp(`eval\\\('\\\\"${placeholder}\.${key}\\\\"'\\\)`, "g"),
      `eval('\\"${serialize(env[key]).slice(1, -1)}\\"')`
    );
    outputCode = outputCode.replace(
      new RegExp(`eval\\\('"${placeholder}\.${key}"'\\\)`, "g"),
      `eval('${serialize(env[key])}')`
    );
  });
  outputCode = outputCode.replace(
    new RegExp(`eval\\\('\\\\"${placeholder}\\\\"'\\\)`, "g"),
    `eval('(\\"${serialize(env).slice(1, -1)})\\"')`
  );
  outputCode = outputCode.replace(
    new RegExp(`eval\\\('"${placeholder}"'\\\)`, "g"),
    `eval('(${serialize(env)})')`
  );

  return outputCode;
};
