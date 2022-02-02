import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import chalk from "chalk";
import { writeFileSync } from "fs";
import { createDotenvShellTemplate } from "./template";
import { parseSnippet } from "./parse";

const defaultPlaceholder = "__env__";
const preservedEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD", "SSR"];

const createPlugin: ({
  placeholder,
  virtualFile,
}?: {
  placeholder?: string;
  virtualFile?: string;
}) => Plugin = (pluginOptions = {}) => {
  let config: ResolvedConfig;
  let env: typeof config.env;

  const virtualFile = pluginOptions.virtualFile || "env";
  const virtualId = "\0" + virtualFile;
  const placeholder = pluginOptions.placeholder || defaultPlaceholder;

  const envAssetFileNames: string[] = [];

  return <Plugin>{
    name: "dotenv",
    config(_, env) {
      if (env.command === "build") {
        return {
          build: {
            rollupOptions: {
              output: {
                manualChunks: {
                  [virtualFile]: [virtualId],
                },
                chunkFileNames(chunkInfo) {
                  if (chunkInfo.name === virtualFile) {
                    return path.join(config.build!.assetsDir, `[name].js`);
                  }
                  return `[name]-[hash].js`;
                },
              },
            },
          },
        };
      }
    },
    configResolved(_config) {
      config = _config;
      env = { ...config.env, SSR: !!config.build.ssr };
    },
    resolveId(id) {
      if (id === virtualFile) {
        return virtualId;
      }

      if (id === virtualId) {
        return virtualId;
      }
    },
    load(id) {
      if (config.command === "serve") {
        if (id === virtualId) {
          return `export default Object.freeze(${JSON.stringify(env)})`;
        }
      } else {
        if (id === virtualId) {
          const preservedEnv = preservedEnvKeys.reduce((acc, key) => {
            return Object.assign(acc, { [key]: env[key] });
          }, {});
          return [
            parseSnippet,
            `const e = parse(${placeholder});`,
            `export default Object.assign(e, ${JSON.stringify(preservedEnv)});`,
          ].join("\n");
        }
      }
    },
    renderChunk(_, chunk) {
      if (chunk.name === virtualFile) {
        envAssetFileNames.push(chunk.fileName);
      }
    },
    closeBundle() {
      if (config.command === "build") {
        const assetsDir = path.join(
          config.build.outDir,
          config.build.assetsDir
        );
        writeFileSync(
          path.join(assetsDir, ".env.sh"),
          createDotenvShellTemplate({
            dotenvJsFileName: `${virtualFile}`,
            placeholder,
          }),
          {
            mode: 0o755,
          }
        );
        writeFileSync(
          path.join(assetsDir, ".env"),
          Object.keys(env)
            .filter((key) => !preservedEnvKeys.includes(key))
            .map((key) => `${key}=${env[key]}`)
            .concat("")
            .join("\n")
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
      }
    },
  };
};

export default createPlugin;
