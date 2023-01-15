import MagicString from "magic-string";
import { Env } from "./types";
import { replace } from "./replace";

export function transformIndexHtmlDev({
  code,
  env,
  example,
}: {
  code: string;
  env: Env;
  example: readonly string[];
}) {
  const s = new MagicString(code);

  example
    .map((key) => {
      return {
        regexp: new RegExp(`\\bimport_meta_env_${key}\\b`, "g"),
        substitution: env[key],
      };
    })
    .forEach((replacement) => {
      replace({ s, replacement });
    });

  return s.toString();
}
