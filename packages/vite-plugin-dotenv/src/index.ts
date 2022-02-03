import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import chalk from "chalk";
import { chmodSync } from "fs";
import { createDotenvShellTemplate } from "./template";
import { parseSnippet } from "./parse";

const defaultPlaceholder = "__env__";
const preservedEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD"];
const inlineEnvKeys = ["SSR", "LEGACY"];
const unique = (() => {
  const uniqueId = "vite_plugin_dotenv_unique_id_";
  return (
    uniqueId +
    Array(256 - uniqueId.length)
      .fill("x")
      .join("")
  );
})();

const createPlugin: ({
  placeholder,
  virtualFile,
}?: {
  placeholder?: string;
  virtualFile?: string;
}) => Plugin[] = (pluginOptions = {}) => {
  let config: ResolvedConfig;
  let envKeys: Set<string>;

  const virtualFile = pluginOptions.virtualFile || "env";
  const virtualId = "\0" + virtualFile;
  const placeholder = pluginOptions.placeholder || defaultPlaceholder;

  const envAssetFileNames: string[] = [];

  const pre = <Plugin>{
    name: "dotenv:pre",
    enforce: "pre",
    config(_, env) {
      if (env.command === "serve") return;

      return {
        build: {
          rollupOptions: {
            output: {
              manualChunks: {
                [virtualFile]: [virtualId],
              },
              chunkFileNames(chunkInfo) {
                if (chunkInfo.name === virtualFile) {
                  return path.join(config.build.assetsDir, `[name].js`);
                }
                return path.join(config.build.assetsDir, `[name].[hash].js`);
              },
            },
          },
        },
      };
    },
    configResolved(_config) {
      config = _config;

      if (config.command === "serve") return;

      envKeys = new Set([]);
      for (const key of Object.keys(config.env)) {
        envKeys.add(key);
      }
    },
    resolveId(id) {
      if (config.command === "serve") return;

      if (id === virtualFile) {
        return virtualId;
      }

      if (id === virtualId) {
        return virtualId;
      }
    },
    load(id) {
      if (config.command === "serve") return;

      if (id === virtualId) {
        const preservedEnv = preservedEnvKeys.reduce((acc, key) => {
          return Object.assign(acc, { [key]: config.env[key] });
        }, {});
        return [
          parseSnippet,
          `const e = parse(${placeholder});`,
          `export default Object.assign(e, ${JSON.stringify(preservedEnv)});`,
        ].join("\n");
      }
    },
    transform(code, id) {
      if (config.command === "serve") return code;

      if (id !== virtualId && id.includes("node_modules") === false) {
        if ([".js", ".ts", ".jsx", ".tsx"].some((ext) => id.endsWith(ext))) {
          code =
            `import ${unique} from '${virtualFile}';` +
            code.replace(`import ${unique} from '${virtualFile}';`, "");
        } else if (id.endsWith(".vue")) {
          code = code.replace(
            /(\<script.*?\>)/,
            `$1import ${unique} from '${virtualFile}';`
          );
        }

        inlineEnvKeys.forEach((key) => {
          code = code.replace(
            new RegExp(`import.meta.env.${key}`, "g"),
            unique + `.${key}`
          );
        });

        code = code.replace(/import\.meta\.env/g, unique);

        inlineEnvKeys.forEach((key) => {
          code = code.replace(
            new RegExp(unique + `.${key}`, "g"),
            `import.meta.env.${key}`
          );
        });
      }
      return code;
    },
    transformIndexHtml(html) {
      if (config.command === "serve") return;

      html = html.replace(new RegExp(unique, "g"), "import.meta.env");
      return html;
    },
    renderChunk(_, chunk) {
      if (config.command === "serve") return;

      if (chunk.name === virtualFile) {
        envAssetFileNames.push(chunk.fileName);

        this.emitFile({
          type: "asset",
          source: createDotenvShellTemplate({
            dotenvJsFileName: `${virtualFile}`,
            placeholder,
          }),
          fileName: path.join(config.build.assetsDir, ".env.sh"),
        });

        this.emitFile({
          type: "asset",
          source: [...envKeys.keys()]
            .filter((key) => !preservedEnvKeys.includes(key))
            .map((key) => `${key}=${config.env[key]}`)
            .concat("")
            .join("\n"),
          fileName: path.join(config.build.assetsDir, ".env"),
        });
      }
    },
    closeBundle() {
      if (config.command === "serve") return;

      chmodSync(
        path.join(config.build.outDir, config.build.assetsDir, ".env.sh"),
        0o755
      );

      envAssetFileNames.push(config.build.assetsDir + path.sep + ".env.sh");
      envAssetFileNames.push(config.build.assetsDir + path.sep + ".env");
      config.logger.info(
        [
          "",
          `${chalk.green(
            "✓"
          )} [vite-plugin-dotenv] environment files is generated.`,
          chalk.yellow(
            `Before deploying the project, replace ${placeholder} with your environment object in the following files:`
          ),
          ...envAssetFileNames.map(
            (fileName) =>
              chalk.gray(
                chalk.dim.white(
                  config.build.outDir.split(path.sep).pop() + path.sep
                )
              ) + chalk.blue(`${fileName}`)
          ),
          "",
        ].join("\n")
      );
    },
  };

  return [pre];
};

export default createPlugin;
