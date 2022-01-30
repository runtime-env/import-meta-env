import { copyFileSync } from "fs";
import path from "path";
import { Plugin, ResolvedConfig } from "vite";

const virtualFile = ".env";
const virtualId = "\0" + virtualFile;

const createPlugin: () => Plugin = () => {
  let config: ResolvedConfig;
  const backupEnvAssetFilePathPair: [string, string][] = [];

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
      if (id === virtualId) {
        return `export default ${JSON.stringify(config.env)}`;
      }
    },
    renderChunk(_, chunk) {
      if (config.command === "build") {
        if (chunk.name === virtualFile) {
          const envAssetFilePath = path.join(
            config.build!.outDir,
            chunk.fileName
          );
          const backupEnvAssetFilePath = envAssetFilePath + "~";
          backupEnvAssetFilePathPair.push([
            envAssetFilePath,
            backupEnvAssetFilePath,
          ]);
        }
      }
    },
    closeBundle() {
      backupEnvAssetFilePathPair.forEach(
        ([envAssetFilePath, backupEnvAssetFilePath]) => {
          copyFileSync(envAssetFilePath, backupEnvAssetFilePath);
        }
      );
    },
  };
};

export default createPlugin;
