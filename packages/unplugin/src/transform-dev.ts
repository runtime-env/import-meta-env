import { UnpluginContextMeta } from "unplugin";
import { Env } from "./types";
import { ViteResolvedConfig } from "./vite/types";
import { preserveViteBuiltInEnv } from "./vite/preserve-built-in-env";

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
  viteConfig?: ViteResolvedConfig;
}) {
  if (id.includes("node_modules") === false) {
    switch (meta.framework) {
      case "vite":
        if (viteConfig === void 0)
          throw Error("[@import-meta-env/unplugin] internal error");
        code = code.replace(
          /import\.meta\.env/g,
          "(" +
            JSON.stringify({
              ...env,
              ...viteConfig.env,
              LEGACY:
                viteConfig.plugins.find((plugin) =>
                  plugin.name.startsWith("vite:legacy")
                ) !== undefined
                  ? // https://github.com/vitejs/vite/blob/a118a1d98c63028ddc8b2b3389b8cfa58d771e76/packages/plugin-legacy/index.js#L490-L493
                    viteConfig.command === "serve" || viteConfig.build.ssr
                    ? false
                    : "__VITE_IS_LEGACY__"
                  : undefined,
              SSR: !!(process.env.VITEST
                ? // https://github.com/vitest-dev/vitest/blob/3eec387db647db3c03a333ab2513a251571c0bb8/packages/vitest/src/node/plugins/index.ts#L106
                  process.env.SSR ?? "1"
                : // https://github.com/vitejs/vite/blob/6c08c863b552421199321d7178d718220c2f2d39/packages/vite/src/node/build.ts#L366
                  viteConfig.build.ssr),
            }) +
            ")"
        );

        code = preserveViteBuiltInEnv({
          code,
          envPrefix: viteConfig.envPrefix,
        });
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
