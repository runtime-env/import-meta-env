import { Plugin, ResolvedConfig } from "vite";

export interface PluginOptions {
  source?: string;
  placeholder?: string;
}

interface NormalizedPluginOptions {
  placeholder: string;
}
const createPlugin: (pluginOptions?: PluginOptions) => Plugin = (
  pluginOptions
) => {
  const name = "runtime-config";

  const normalizedPluginOptions: NormalizedPluginOptions = {
    placeholder: "__VITE_RUNTIME_CONFIG__",
    ...pluginOptions,
  };
  let config: ResolvedConfig;
  const commonPlugin: Plugin = {
    name,
    enforce: "post",
    config() {
      return { assetsInclude: ".env" };
    },
    configResolved(_config) {
      config = _config;
    },
    resolveId(id) {
      if (id === ".env") {
        return id;
      }
    },
  };

  if (process.env.NODE_ENV === "production") {
    return {
      ...commonPlugin,
      load(id) {
        if (id === ".env") {
          this.emitFile({
            type: "asset",
            fileName: "assets/.env",
            source: `export default ${normalizedPluginOptions.placeholder}`,
          });
          return `const env = import(${JSON.stringify(
            "/.env"
          )}); export default env`;
        }
      },
    };
  } else {
    return {
      ...commonPlugin,
      load(id) {
        if (id === "/" + ".env") {
          const result = `export default ${JSON.stringify(config.env)}`;
          return result;
        }
      },
    };
  }
};

export default createPlugin;
