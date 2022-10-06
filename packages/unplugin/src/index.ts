import { createUnplugin } from "unplugin";
import colors from "picocolors";
import { version } from "../package.json";
import {
  resolveEnv,
  getPackageManagerExecCommand,
  envFilePath as defaultEnvFilePath,
  uniqueVariableName,
  virtualFile,
} from "../../shared";
import { PluginOptions } from "./types";
import { mergeManualChunks as viteMergeManualChunks } from "./vite/merge-manual-chunks";
import { mergeManualChunks as rollupMergeManualChunks } from "./rollup/merge-manual-chunks";
import { extname } from "path";
import { ImportMetaPlugin } from "./webpack/import-meta-plugin";
import { loadProd } from "./load-prod";
import { transformDev } from "./transform-dev";
import { transformProd } from "./transform-prod";
import { ViteResolvedConfig } from "./vite/types";

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
  let env: Record<string, string> = {};

  let shouldInlineEnv = options?.shouldInlineEnv;

  let viteConfig: ViteResolvedConfig;

  return {
    name: "import-meta-env",

    vite: {
      enforce: "pre",

      apply(_, env) {
        debug && console.debug("apply::");

        shouldInlineEnv = shouldInlineEnv ?? env.mode !== "production";
        return true;
      },

      config(config) {
        debug && console.debug("config::", config);

        if (shouldInlineEnv) {
        } else {
          return viteMergeManualChunks(config);
        }
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

        html = html.replace(
          new RegExp(uniqueVariableName, "g"),
          "import.meta.env"
        );
        return html;
      },
    },

    rollup: {
      outputOptions(options) {
        debug && console.debug("rollup::outputOptions::");

        if (shouldInlineEnv) {
        } else {
          return rollupMergeManualChunks(options);
        }
      },

      buildStart() {
        debug && console.debug("rollup::buildStart::");

        shouldInlineEnv =
          shouldInlineEnv ?? process.env.ROLLUP_WATCH === "true";

        if (shouldInlineEnv) {
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        }
      },
    },

    webpack: (compiler) => {
      if (process.env.npm_package_devDependencies__vue_cli_service) {
        compiler.options.plugins.push(new ImportMetaPlugin());
      }

      const developmentModes: typeof compiler.options.mode[] = [
        "development",
        "none",
      ];
      shouldInlineEnv =
        shouldInlineEnv ??
        compiler.options.watch ??
        developmentModes.includes(compiler.options.mode);

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

    resolveId(id, importer) {
      debug && console.debug("resolveId::", id, importer);

      if (shouldInlineEnv) {
      } else {
        if (id === virtualFile) {
          return virtualFile;
        }
      }
    },

    ...(meta.framework === "webpack"
      ? {}
      : {
          load(id) {
            debug && console.debug("load::", id);

            if (shouldInlineEnv) {
              return null;
            } else {
              debug && console.debug("loadProd::", id);
              return loadProd({ id, envExampleFilePath, meta, viteConfig });
            }
          },
        }),

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
      if (shouldInlineEnv) {
        debug && console.debug("transformDev::", id);

        code = transformDev({ code, id, env, meta, viteConfig });
      } else {
        debug && console.debug("transformProd::", id);
        debug && console.debug("=== code before ===");
        debug && console.debug(code);
        debug && console.debug("==================");

        code = transformProd({ code, id, meta });

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
