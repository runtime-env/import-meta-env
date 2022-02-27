import { createUnplugin } from "unplugin";
import colors from "picocolors";
import { config as dotenvConfig } from "dotenv";
import hash from "object-hash";
import { version } from "../package.json";
import {
  resolveEnv,
  getPackageManagerExecCommand,
  envExampleFilePath as defaultEnvExampleFilePath,
  envFilePath as defaultEnvFilePath,
  uniqueVariableName,
  virtualFile,
  placeholder,
} from "../../shared";
import { PluginOptions } from "./types";
import { withholdViteBuiltInEnv } from "./vite/withhold-built-in-env";
import { mergeManualChunks as viteMergeManualChunks } from "./vite/merge-manual-chunks";
import { mergeManualChunks as rollupMergeManualChunks } from "./rollup/merge-manual-chunks";

type ViteResolvedConfig = Parameters<
  Exclude<
    ReturnType<ReturnType<typeof createUnplugin>["vite"]>["configResolved"],
    undefined
  >
>["0"];

const createPlugin = createUnplugin<PluginOptions>((options, meta) => {
  // console.debug(options, meta);

  const envFilePath = options?.env ?? defaultEnvFilePath;
  const envExampleFilePath = options?.envExample ?? defaultEnvExampleFilePath;
  let env: Record<string, string> = {};

  let isDev = false;

  let viteConfig: ViteResolvedConfig;

  function loadProd(id: string) {
    // console.debug("loadProd: ", id);

    if (id === virtualFile) {
      const parsedExample = (() => {
        const { parsed, error } = dotenvConfig({ path: ".env.example" });
        if (error) {
          return {};
        }
        return parsed!;
      })();
      const hashValue = hash.keys(parsedExample);

      let envCode;
      switch (meta.framework) {
        case "vite":
          envCode = `const e = Object.assign(${placeholder}, ${JSON.stringify(
            viteConfig.env
          )});`;
          break;

        default:
          envCode = `const e = ${placeholder};`;
          break;
      }

      return [
        `console.assert("${hashValue}"); // Invalidate the cache when the .env.example changes.`,
        envCode,
        `export default e;`,
      ].join("\n");
    }
  }

  function transformDev(code: string, id: string) {
    // console.debug("transformDev: ", id);

    if (id !== virtualFile && id.includes("node_modules") === false) {
      switch (meta.framework) {
        case "vite":
          code = code.replace(
            /import\.meta\.env/g,
            JSON.stringify({ ...env, ...viteConfig.env })
          );

          code = withholdViteBuiltInEnv(code);
          break;

        default:
          code = code.replace(/import\.meta\.env/g, JSON.stringify(env));
          break;
      }
    }

    return code;
  }

  function transformProd(code: string, id: string) {
    // console.debug("transformProd: ", id);

    if (id !== virtualFile && id.includes("node_modules") === false) {
      if (isTransformingJs(code, id) || isTransformingSvelte(code, id)) {
        code =
          `import ${uniqueVariableName} from '${virtualFile}';\n` +
          code.replace(
            `import ${uniqueVariableName} from '${virtualFile}';\n`,
            ""
          );
      } else if (isTransformingVue(code, id)) {
        code = code.replace(
          /(\<script.*?\>)/,
          `$1\nimport ${uniqueVariableName} from '${virtualFile}';`
        );
      }

      code = code.replace(/import\.meta\.env/g, uniqueVariableName);

      code = withholdViteBuiltInEnv(code);
    }

    return code;
  }

  return {
    name: "import-meta-env",

    vite: {
      enforce: "pre",

      apply(_, env) {
        // console.debug("apply");

        isDev = env.command === "serve";
        return true;
      },

      config(config) {
        // console.debug("config:", config);

        if (isDev) {
        } else {
          return viteMergeManualChunks(config);
        }
      },

      configResolved(_config) {
        // console.debug("configResolved");

        if (_config.isProduction) {
          // running in `vite preview`
        } else {
          // running in `vite dev`
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        }

        viteConfig = _config;
      },

      transformIndexHtml(html) {
        // console.debug("transformIndexHtml");

        html = html.replace(
          new RegExp(uniqueVariableName, "g"),
          "import.meta.env"
        );
        return html;
      },
    },

    rollup: {
      outputOptions(options) {
        // console.debug("rollup::outputOptions");

        if (isDev) {
        } else {
          return rollupMergeManualChunks(options);
        }
      },

      buildStart() {
        // console.debug("rollup::buildStart");

        isDev = process.env.NODE_ENV !== "production";

        if (isDev) {
          env = resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        }
      },
    },

    webpack: (compiler) => {
      const mode = compiler.options.mode ?? "production"; // default mode is production;
      isDev = mode !== "production";

      if (isDev) {
        env = resolveEnv({
          envFilePath,
          envExampleFilePath,
        });
      }
    },

    buildStart() {
      // console.debug("buildStart");
      // console.debug("env:", env);
    },

    resolveId(id, importer) {
      // console.debug("resolveId: ", id, importer);

      if (isDev) {
      } else {
        if (id === virtualFile) {
          return virtualFile;
        }
      }
    },

    load(id) {
      // console.debug("load: ", id);

      if (isDev) {
        return null;
      } else {
        return loadProd(id);
      }
    },

    transformInclude(id) {
      // console.debug("transformIncludes: ", id);

      return id.includes("node_modules") === false;
    },

    transform(code, id) {
      // console.debug("transform: ", id);

      if (isDev) {
        return transformDev(code, id);
      } else {
        return transformProd(code, id);
      }
    },

    buildEnd() {
      // console.debug("buildEnd");

      const execCommand = getPackageManagerExecCommand();

      if (isDev) {
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

const isTransformingJs = (code: string, id: string) =>
  [".js", ".ts", ".jsx", ".tsx"].some((ext) => id.endsWith(ext)) &&
  id.includes("?vue&type=template") === false;

const isTransformingVue = (code: string, id: string) => id.endsWith(".vue");

const isTransformingSvelte = (code: string, id: string) =>
  id.endsWith(".svelte");
