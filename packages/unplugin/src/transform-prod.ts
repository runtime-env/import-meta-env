import { placeholder, virtualFile } from "../../shared";
import { Env } from "./types";

export function transformProd({
  code,
  id,
  env,
}: {
  code: string;
  id: string;
  env: Env;
}) {
  if (id !== virtualFile && id.includes("node_modules") === false) {
    Object.keys(env).forEach((key) => {
      code = code.replace(
        new RegExp(`__ENV__\\.${key}`, "g"),
        `eval('"${placeholder}.${key}"')`
      );
    });
    code = code.replace(new RegExp(`__ENV__`, "g"), `eval('"${placeholder}"')`);
  }

  return code;
}
