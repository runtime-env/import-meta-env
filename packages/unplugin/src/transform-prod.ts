import { UnpluginContextMeta } from "unplugin";
import { placeholder } from "../../shared";
import { ViteResolvedConfig } from "./vite/types";
import { preserveViteBuiltInEnv } from "./vite/preserve-built-in-env";
import { unwrapSignalForImportMetaEnvEnv } from "./qwik/unwrap-signal-for-import-meta-env-env";

export function transformProd({
  code,
  id,
  meta,
  example,
  viteConfig,
}: {
  code: string;
  id: string;
  meta: UnpluginContextMeta;
  example: readonly string[];
  viteConfig?: ViteResolvedConfig;
}) {
  if (id.includes("node_modules") === false) {
    code = unwrapSignalForImportMetaEnvEnv({ code, example });

    example.forEach((key) => {
      code = code.replace(
        new RegExp(`\\bimport\\.meta\\.env\\.${key}\\b`, "g"),
        `${placeholder}.${key}`
      );
    });

    if (meta.framework === "vite") {
      if (viteConfig === void 0)
        throw Error("[@import-meta-env/unplugin]: internal error.");
      code = preserveViteBuiltInEnv({ code, envPrefix: viteConfig.envPrefix });
    }
  }

  return code;
}
