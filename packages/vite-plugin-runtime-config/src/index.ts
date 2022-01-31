import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import { stringify } from "envfile";

const virtualFile = ".env";
const virtualId = "\0" + virtualFile;

const createPlugin: () => Plugin = () => {
  let config: ResolvedConfig;

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
    renderChunk(code, chunk, options) {
      if (chunk.name === virtualFile) {
        this.emitFile({
          type: "asset",
          fileName: path.join(config.build.assetsDir, virtualFile),
          source: stringify(config.env),
        });
      }
    },
  };
};

export default createPlugin;
