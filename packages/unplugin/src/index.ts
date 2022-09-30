import { createUnplugin } from "unplugin";
import colors from "picocolors";
import { version } from "../package.json";
import {
  resolveEnv,
  getPackageManagerExecCommand,
  envFilePath as defaultEnvFilePath,
} from "../../shared";
import { PluginOptions } from "./types";
import { transformDev } from "./transform-dev";
import { transformProd } from "./transform-prod";
import { extname } from "path";

const createPlugin = createUnplugin<PluginOptions>((options, meta) => {
  const debug = false;
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

  return {
    name: "final-env",

    enforce: "post",

    vite: {
      apply(_, env) {
        debug && console.debug("apply::");

        shouldInlineEnv = shouldInlineEnv ?? env.command === "serve";
        return true;
      },

      configResolved(_config) {
        debug && console.debug("configResolved::");

        if (_config.isProduction) {
          // running in `vite build` and `vite preview`
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
            exampleOnly: true,
          });
        } else {
          // running in `vite dev`
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        }
      },
    },

    rollup: {
      buildStart() {
        debug && console.debug("rollup::buildStart::");

        shouldInlineEnv =
          shouldInlineEnv ?? process.env.ROLLUP_WATCH === "true";

        if (shouldInlineEnv) {
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        } else {
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
            exampleOnly: true,
          });
        }
      },
    },

    webpack: (compiler) => {
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
      } else {
        env = resolveEnv({
          envFilePath,
          envExampleFilePath,
          exampleOnly: true,
        });
      }
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
      if (shouldInlineEnv) {
        debug && console.debug("transformDev::", id);

        code = transformDev({ code, id, env });
      } else {
        debug && console.debug("transformProd::", id);
        debug && console.debug("=== code before ===");
        debug && console.debug(code);
        debug && console.debug("==================");

        code = transformProd({ code, id, env });

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
            `${colors.cyan("final-env v" + version)}`,
            `${colors.green("✓")} environment files are generated.`,
            colors.yellow(
              `Remember to inject (\`${execCommand} final-env\`) environment variables before serving your application.`
            ),
            "",
          ].join("\n")
        );
      }
    },
  };
});

export default createPlugin;
