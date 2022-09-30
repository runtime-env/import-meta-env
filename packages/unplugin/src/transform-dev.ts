import { virtualFile } from "../../shared";
import { Env } from "./types";

export function transformDev({
  code,
  id,
  env,
}: {
  code: string;
  id: string;
  env: Env;
}) {
  if (id !== virtualFile && id.includes("node_modules") === false) {
    code = code.replace(/__ENV__/g, "(" + JSON.stringify(env) + ")");
  }

  return code;
}
