import { placeholderVariants } from "./shared";
import serialize from "serialize-javascript";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  let outputCode = code;

  placeholderVariants.forEach((p) => {
    Object.keys(env).forEach((k) => {
      outputCode = outputCode.replace(
        new RegExp(`${p}\\.${k}\\b`, "g"),
        serialize(env[k])
      );
      outputCode = outputCode.replace(
        new RegExp(`\\(${p}\\)\\.${k}\\b`, "g"),
        serialize(env[k])
      );
    });
  });

  placeholderVariants.forEach((p) => {
    outputCode = outputCode.replace(
      new RegExp("=>([\\s]*)" + p, "g"),
      "=>$1(" + serialize(env) + ")"
    );
    outputCode = outputCode.replace(new RegExp(p, "g"), serialize(env));
  });

  return outputCode;
};
