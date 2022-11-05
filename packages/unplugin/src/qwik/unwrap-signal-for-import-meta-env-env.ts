import { accessor } from "../../../shared/constant";
import { Replacement } from "../replacement";
import { Env } from "../types";

export function unwrapSignalForImportMetaEnvEnv(
  options: {
    example: readonly string[];
  } & (
    | {
        env: Env;
        transformMode: "compile-time";
      }
    | {
        transformMode: "runtime";
      }
  )
): Replacement[] {
  return options.example.map((key) => {
    return {
      regexp: new RegExp(
        `\\b_wrapSignal\\(import\\.meta\\.env, "(${key})"\\)`,
        "g"
      ),
      substitution:
        options.transformMode === "compile-time"
          ? JSON.stringify(options.env[key])
          : `${accessor}.${key}`,
    };
  });
}
