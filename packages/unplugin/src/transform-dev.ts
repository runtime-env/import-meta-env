import { UnpluginContextMeta } from "unplugin";
import { Env } from "./types";
import { ViteResolvedConfig } from "./vite/types";
import { preserveViteBuiltInEnv } from "./vite/preserve-built-in-env";
import { unwrapSignalForImportMetaEnvEnv } from "./qwik/unwrap-signal-for-import-meta-env-env";

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
  if (id.includes("node_modules") === false) {
    code = unwrapSignalForImportMetaEnvEnv({ code, example });

    example.forEach((key) => {
      code = code.replace(
        new RegExp(`\\bimport\\.meta\\.env\\.${key}\\b`, "g"),
        JSON.stringify(env[key])
      );
    });

    if (meta.framework === "vite") {
      if (viteConfig === void 0)
        throw Error("[@import-meta-env/unplugin] internal error");
      code = preserveViteBuiltInEnv({ code, envPrefix: viteConfig.envPrefix });
    }
  }

  return code;
}
