import { createUnplugin } from "unplugin";
import colors from "picocolors";
import { version } from "../package.json";
import {
  resolveEnv,
  getPackageManagerExecCommand,
  envFilePath as defaultEnvFilePath,
  placeholder,
} from "../../shared";
import { PluginOptions } from "./types";
import { extname } from "path";
import { ImportMetaPlugin } from "./webpack/import-meta-plugin";
import { transformDev } from "./transform-dev";
import { transformProd } from "./transform-prod";
import { ViteResolvedConfig } from "./vite/types";
import { warnEnvPrefix } from "./vite/warn-env-prefix";

const createPlugin = createUnplugin<PluginOptions>((options, meta) => {
  const debug = process.env.DEBUG_IMPORT_META_ENV;
  debug && console.debug("factory::", options, meta);

  const envFilePath = options?.env ?? defaultEnvFilePath;
  const envExampleFilePath = options?.example;
  if (envExampleFilePath === undefined) {
    throw Error(
      `example option is required. Please specify it in the plugin options.`
    );
  }

  let shouldInlineEnv = options?.shouldInlineEnv;

  let env: Record<string, string> =
    meta.framework === "esbuild"
      ? shouldInlineEnv
        ? resolveEnv({
            envFilePath,
            envExampleFilePath,
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

        shouldInlineEnv = shouldInlineEnv ?? env.mode !== "production";
        return true;
      },

      configResolved(_config) {
        debug && console.debug("configResolved::");

        if (shouldInlineEnv) {
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        }

        viteConfig = _config;
      },

      transformIndexHtml(html) {
        debug && console.debug("transformIndexHtml::");

        debug && console.debug("=== index.html before ===");
        debug && console.debug(html);
        debug && console.debug("==================");

        html = html.replace(
          new RegExp(`\\(${placeholder}\\)`, "g"),
          "import.meta.env"
        );

        debug && console.debug("=== index.html after ===");
        debug && console.debug(html);
        debug && console.debug("==================");

        return html;
      },
    },

    rollup: {
      buildStart() {
        debug && console.debug("rollup::buildStart::");

        shouldInlineEnv =
          shouldInlineEnv ?? process.env.NODE_ENV !== "production";

        if (shouldInlineEnv) {
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        }
      },
    },

    webpack: (compiler) => {
      compiler.options.plugins.push(new ImportMetaPlugin());

      const developmentModes: typeof compiler.options.mode[] = [
        "development",
        "none",
      ];
      shouldInlineEnv =
        shouldInlineEnv ?? developmentModes.includes(compiler.options.mode);

      if (shouldInlineEnv) {
        env = resolveEnv({
          envFilePath,
          envExampleFilePath,
        });
      }
    },

    buildStart() {
      debug && console.debug("buildStart::");
      debug && console.debug("env::", env);
    },

    transformInclude(id) {
      debug && console.debug("transformIncludes::", id);

      const allowExtensions = [
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".vue",
        ".svelte",
        ".mjs",
        ".cjs",
        meta.framework !== "webpack" && ".html",
      ].filter(Boolean);

      return (
        id.includes("node_modules") === false &&
        allowExtensions.includes(extname(id))
      );
    },

    transform(code, id) {
      if (meta.framework === "vite")
        warnEnvPrefix({
          envExampleFilePath,
          viteConfigEnvPrefix: viteConfig?.envPrefix,
          warn: this.warn.bind(this),
        });

      if (shouldInlineEnv) {
        debug && console.debug("transformDev::", id);

        code = transformDev({ code, id, env, meta, viteConfig });
      } else {
        debug && console.debug("transformProd::", id);
        debug && console.debug("=== code before ===");
        debug && console.debug(code);
        debug && console.debug("==================");

        code = transformProd({ code, id, meta, viteConfig });

        debug && console.debug("=== code after ===");
        debug && console.debug(code);
        debug && console.debug("==================");
      }

      return code;
    },

    buildEnd() {
      debug && console.debug("buildEnd::");

      const execCommand = getPackageManagerExecCommand();

      if (shouldInlineEnv) {
      } else {
        console.info(
          [
            "",
            `${colors.cyan("import-meta-env v" + version)}`,
            `${colors.green("✓")} environment files are generated.`,
            colors.yellow(
              `Remember to inject (\`${execCommand} import-meta-env\`) environment variables before serving your application.`
            ),
            "",
          ].join("\n")
        );
      }
    },
  };
});

export default createPlugin;
