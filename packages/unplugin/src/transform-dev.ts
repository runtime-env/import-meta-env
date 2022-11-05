import { UnpluginContextMeta } from "unplugin";
import { Env } from "./types";
import { ViteResolvedConfig } from "./vite/types";
import {
  builtInEnvKeys,
  preserveViteBuiltInEnv,
} from "./vite/preserve-built-in-env";
import { unwrapSignalForImportMetaEnvEnv } from "./qwik/unwrap-signal-for-import-meta-env-env";
import MagicString from "magic-string";
import { replace } from "./replace";

export function transformDev({
  code,
  id,
  meta,
  env,
  example,
  viteConfig,
}: {
  code: string;
  id: string;
  meta: UnpluginContextMeta;
  env: Env;
  example: readonly string[];
  viteConfig?: ViteResolvedConfig;
}) {
  const s = new MagicString(code);

  if (id.includes("node_modules") === false) {
    unwrapSignalForImportMetaEnvEnv({
      example,
      transformMode: "compile-time",
      env,
    }).forEach((replacement) => {
      replace({ s, replacement });
    });

    example
      .map((key) => {
        if (meta.framework === "vite" && builtInEnvKeys.includes(key)) {
          throw Error(
            `It seems you want to use a runtime environment variable prefixed by or equal to: \`${key
              .split(".")
              .pop()}\`, but this conflicts with Vite's environment variables. You can fix this by using a different environment variable name or changing Vite's \`envPrefix\` configuration.`
          );
        }

        return {
          regexp: new RegExp(`\\bimport\\.meta\\.env\\.${key}\\b`, "g"),
          substitution: JSON.stringify(env[key]),
        };
      })
      .forEach((replacement) => {
        replace({ s, replacement });
      });

    if (meta.framework === "vite") {
      if (viteConfig === void 0)
        throw Error("[@import-meta-env/unplugin] internal error");

      preserveViteBuiltInEnv({ envPrefix: viteConfig.envPrefix }).forEach(
        (replacement) => {
          try {
            replace({ s, replacement });
          } catch (error) {
            throw Error(
              `It seems you want to use a runtime environment variable prefixed by or equal to: \`${replacement.substitution
                .split(".")
                .pop()}\`, but this conflicts with Vite's environment variables. You can fix this by using a different environment variable name or changing Vite's \`envPrefix\` configuration.`
            );
          }
        }
      );
    }
  }

  return {
    code: s.toString(),
    map: s.generateMap(),
  };
}
