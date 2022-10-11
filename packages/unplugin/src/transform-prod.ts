import { UnpluginContextMeta } from "unplugin";
import { placeholder } from "../../shared";
import { ViteResolvedConfig } from "./vite/types";
import { preserveViteBuiltInEnv } from "./vite/preserve-built-in-env";

export function transformProd({
  code,
  id,
  meta,
  viteConfig,
}: {
  code: string;
  id: string;
  meta: UnpluginContextMeta;
  viteConfig?: ViteResolvedConfig;
}) {
  if (id.includes("node_modules") === false) {
    code = code.replace(/import\.meta\.env/g, `(${placeholder})`);

    if (meta.framework === "vite") {
      if (viteConfig === void 0)
        throw Error("[@import-meta-env/unplugin]: internal error.");
      code = preserveViteBuiltInEnv({ code, envPrefix: viteConfig.envPrefix });
    }
  }

  return code;
}
