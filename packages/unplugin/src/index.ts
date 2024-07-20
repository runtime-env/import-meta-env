import { createUnplugin } from "unplugin";
import colors from "picocolors";
import { version } from "../package.json";
import { resolveEnv, getPackageManagerExecCommand } from "../../shared";
import { createAccessorRegExp } from "./constant";
import { PluginOptions } from "./types";
import { ImportMetaEnvPlugin } from "./webpack/import-meta-env-plugin";
import { transformDev } from "./transform-dev";
import { transformProd } from "./transform-prod";
import { ViteResolvedConfig } from "./vite/types";
import { resolveEnvExampleKeys } from "packages/shared/resolve-env-example-keys";
import { SourceMap } from "magic-string";

const createPlugin = createUnplugin<PluginOptions>((options, meta) => {
  const debug = process.env.DEBUG_IMPORT_META_ENV;
  debug && console.debug("factory::", options, meta);

  const envExampleKeys = resolveEnvExampleKeys({
    envExampleFilePath: options?.example,
  });

  let transformMode: undefined | "compile-time" | "runtime" =
    options?.transformMode;

  let env: Record<string, string> =
    meta.framework === "esbuild"
      ? transformMode === "compile-time"
        ? resolveEnv({
            envExampleFilePath: options?.example,
            envFilePath: options?.env,
          })
        : {}
      : {};

  let viteConfig: undefined | ViteResolvedConfig;

  return {
    name: "import-meta-env",

    enforce: meta.framework === "webpack" ? "post" : void 0,

    vite: {
      enforce: "pre",

      apply(_, env) {
        debug && console.debug("apply::");

        transformMode =
          transformMode ??
          (env.mode !== "production" ? "compile-time" : "runtime");
        return true;
      },

      configResolved(_config) {
        debug && console.debug("configResolved::");

        if (transformMode === "compile-time") {
          env = resolveEnv({
            envExampleFilePath: options?.example,
            envFilePath: options?.env,
          });
        }

        viteConfig = _config;
      },

      transformIndexHtml(html) {
        debug && console.debug("transformIndexHtml::");

        debug && console.debug("=== index.html before ===");
        debug && console.debug(html);
        debug && console.debug("==================");

        html = html.replace(createAccessorRegExp(""), "import.meta.env");

        debug && console.debug("=== index.html after ===");
        debug && console.debug(html);
        debug && console.debug("==================");

        return html;
      },
    },

    rollup: {
      buildStart() {
        debug && console.debug("rollup::buildStart::");

        transformMode =
          transformMode ??
          (process.env.NODE_ENV !== "production" ? "compile-time" : "runtime");

        if (transformMode === "compile-time") {
          env = resolveEnv({
            envExampleFilePath: options?.example,
            envFilePath: options?.env,
          });
        }
      },
    },

    webpack: (compiler) => {
      compiler.options.plugins.push(new ImportMetaEnvPlugin());

      const developmentModes: (typeof compiler.options.mode)[] = [
        "development",
        "none",
      ];
      transformMode =
        transformMode ??
        (developmentModes.includes(compiler.options.mode)
          ? "compile-time"
          : "runtime");

      if (transformMode === "compile-time") {
        env = resolveEnv({
          envExampleFilePath: options?.example,
          envFilePath: options?.env,
        });
      }
    },

    rspack: (compiler) => {
      transformMode =
        (transformMode ?? compiler.options.mode === "production")
          ? "runtime"
          : "compile-time";

      if (transformMode === "compile-time") {
        env = resolveEnv({
          envExampleFilePath: options?.example,
          envFilePath: options?.env,
        });
      }
    },

    buildStart() {
      debug && console.debug("buildStart::");
      debug && console.debug("env::", env);
    },

    transformInclude(id) {
      const include = [/\.[jt]sx?$/, /\.vue$/, /\.vue\?(vue)/, /\.svelte$/];
      const exclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/];
      const shouldInclude =
        include.some((re) => re.test(id)) &&
        exclude.every((re) => re.test(id) === false);

      debug && console.debug("transformIncludes::", shouldInclude, id);

      return shouldInclude;
    },

    transform(code, id) {
      let result: undefined | { code: string; map: SourceMap };
      debug && console.debug("==================");
      if (transformMode === "compile-time") {
        debug && console.debug("=== compile-time transform ===", id);
        debug && console.debug("=== before ===");
        debug && console.debug(code);

        result = transformDev({
          code,
          id,
          env,
          example: envExampleKeys,
          meta,
          viteConfig,
        });

        debug && console.debug("=== code after ===");
        debug && console.debug(result?.code ?? code);
      } else {
        debug && console.debug("=== runtime transform ===", id);
        debug && console.debug("=== before ===");
        debug && console.debug(code);

        result = transformProd({
          code,
          id,
          example: envExampleKeys,
          meta,
          viteConfig,
        });

        debug && console.debug("=== after ===");
        debug && console.debug(result?.code ?? code);
      }
      debug && console.debug("==================");

      return result;
    },

    buildEnd() {
      debug && console.debug("buildEnd::");

      const execCommand = getPackageManagerExecCommand();

      if (transformMode === "compile-time") {
      } else {
        console.info(
          [
            "",
            `${colors.cyan("import-meta-env v" + version)}`,
            `${colors.green("✓")} environment files are generated.`,
            colors.yellow(
              `Remember to inject (\`${execCommand} import-meta-env\`) environment variables before serving your application.`,
            ),
            "",
          ].join("\n"),
        );
      }
    },
  };
});

export default createPlugin;
