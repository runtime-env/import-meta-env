import path from "path";
import { Plugin, ResolvedConfig } from "vite";

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
  };
};

export default createPlugin;
