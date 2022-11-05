import serialize from "serialize-javascript";
import { createScriptPlaceholderRegExp } from "../../shared";

export const replaceAllPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  let outputCode = code;

  outputCode = outputCode.replace(
    createScriptPlaceholderRegExp(),
    `<script>globalThis.import_meta_env=${serialize(env)}</script>`
  );

  return outputCode;
};
