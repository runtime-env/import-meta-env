import { virtualFile } from "../../shared";
import { UnpluginContextMeta } from "unplugin";
import { Env } from "./types";
import { ViteResolvedConfig } from "./vite/types";
import { withholdViteBuiltInEnv } from "./vite/withhold-built-in-env";

export function transformDev({
  code,
  id,
  meta,
  env,
  viteConfig,
}: {
  code: string;
  id: string;
  meta: UnpluginContextMeta;
  env: Env;
  viteConfig: ViteResolvedConfig;
}) {
  if (id !== virtualFile && id.includes("node_modules") === false) {
    switch (meta.framework) {
      case "vite":
        code = code.replace(
          /import\.meta\.env/g,
          "(" + JSON.stringify({ ...env, ...viteConfig.env }) + ")"
        );

        code = withholdViteBuiltInEnv(code);
        break;

      default:
        code = code.replace(
          /import\.meta\.env/g,
          "(" + JSON.stringify(env) + ")"
        );
        break;
    }
  }

  return code;
}
