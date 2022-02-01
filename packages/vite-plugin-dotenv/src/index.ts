import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import chalk from "chalk";
import { copyFileSync } from "fs";

const virtualFile = ".env";
const virtualId = "\0" + virtualFile;
const defaultPlaceholder = "__DOTENV__";

const createPlugin: ({ placeholder }?: { placeholder?: string }) => Plugin = (
  pluginOptions = {}
) => {
  let config: ResolvedConfig;

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
      const assetsDir = path.join(config.build.outDir, config.build.assetsDir);
      copyFileSync(
        "node_modules/vite-plugin-dotenv/bin/dotenv.sh",
        path.join(assetsDir, "dotenv.sh")
      );
      copyFileSync(".env", path.join(assetsDir, ".env"));
      envAssetFileNames.push(config.build.assetsDir + path.sep + "dotenv.sh");
      envAssetFileNames.push(config.build.assetsDir + path.sep + ".env");

      if (config.command === "build") {
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
