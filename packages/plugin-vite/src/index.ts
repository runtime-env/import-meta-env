import { Plugin, ResolvedConfig } from "vite";

export interface PluginOptions {
  source?: string;
  placeholder?: string;
}

interface NormalizedPluginOptions {
  source: string;
  placeholder: string;
}
const createPlugin: (pluginOptions: PluginOptions) => Plugin = (
  pluginOptions = {}
) => {
  const name = "runtime-config";

  const normalizedPluginOptions: NormalizedPluginOptions = {
    source: pluginOptions.source || ".env",
    placeholder: pluginOptions.placeholder || "__VITE_RUNTIME_CONFIG__",
  };
  let config: ResolvedConfig;
  const commonPlugin: Plugin = {
    name,
    config: () => {
      // console.log("=== config ===");
      return { assetsInclude: normalizedPluginOptions.source };
    },
    configResolved: (_config) => {
      // console.log("=== configResolved ===", _config);
      config = _config;
    },
    resolveId(id) {
      // console.log("=== resolveId ===", id);
      if (id === normalizedPluginOptions.source) {
        return id;
      }
    },
  };

  if (process.env.NODE_ENV === "production") {
    // console.log("=== production ===");
    return {
      ...commonPlugin,
      load(id) {
        // console.log("=== load ===", id);
        if (id === normalizedPluginOptions.source) {
          const result = `export default ${normalizedPluginOptions.placeholder}`;
          // console.log("=== result ===", result);
          return result;
        }
      },
    };
  } else {
    // console.log("=== development ===");
    return {
      ...commonPlugin,
      load(id) {
        // console.log("=== load ===", id);
        if (id === "/" + normalizedPluginOptions.source) {
          const result = `export default ${JSON.stringify(config.env)}`;
          // console.log("=== result ===", result);
          return result;
        }
      },
      configureServer(server) {
        server.watcher.add(normalizedPluginOptions.source);
      },
    };
  }
};

export default createPlugin;

// options: (options) => {
//   return {
//     ...options,
//     external: (source, ...restArgs) => {
// console.log("external", source);
//       const optionExternal = options.external;
//       let normalizedOptionExternal: () => boolean = () => false;
//       if (typeof optionExternal === "string") {
//         normalizedOptionExternal = () => optionExternal === source;
//       } else if (optionExternal instanceof RegExp) {
//         normalizedOptionExternal = () => optionExternal.test(source);
//       } else if (typeof optionExternal === "function") {
//         normalizedOptionExternal = () =>
//           optionExternal(source, ...restArgs) || false;
//       }
//       if (normalizedOptionExternal()) {
//         return true;
//       }
//       if (process.env.NODE_ENV === "production") {
//         return source === normalizedPluginOptions.source;
//       }
//     },
//   };
// },
// generateBundle: (options, bundle, isWrite) => {
// console.log("bundle");
// console.log(bundle);
// console.log("");
// },
