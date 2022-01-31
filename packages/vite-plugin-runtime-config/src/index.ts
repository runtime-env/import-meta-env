import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import chalk from "chalk";

const virtualFile = ".env";
const virtualId = "\0" + virtualFile;
const defaultPlaceholder = "__RUNTIME_CONFIG__";

const createPlugin: ({ placeholder }?: { placeholder?: string }) => Plugin = (
  pluginOptions = {}
) => {
  let config: ResolvedConfig;

  const placeholder = pluginOptions.placeholder || defaultPlaceholder;

  const envAssetFileNames: string[] = [];

  return <Plugin>{
    name: "runtime-config",
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
          return `export default ${JSON.stringify(config.env)}`;
        }
      } else {
        if (id === virtualId) {
          return `export default ${placeholder}`;
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
        config.logger.info(
          [
            "",
            `${chalk.green("✓")} [runtime-config] is generated.`,
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
