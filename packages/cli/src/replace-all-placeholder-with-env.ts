import { placeholderVariants } from "./shared";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  let outputCode = code;

  placeholderVariants.forEach((p) => {
    outputCode = outputCode.replace(
      new RegExp("=>([\\s]*)" + p, "g"),
      "=>$1(" + JSON.stringify(env) + ")"
    );
    outputCode = outputCode.replace(new RegExp(p, "g"), JSON.stringify(env));
  });

  return outputCode;
};
