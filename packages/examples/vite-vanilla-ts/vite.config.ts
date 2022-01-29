import { defineConfig, Plugin } from "vite";

const createPlugin = () =>
  <Plugin>{
    name: "qwe",
    options: (options) => {
      return {
        ...options,
        external: (source, ...restArgs) => {
          const optionExternal = options.external;
          let normalizedOptionExternal: () => boolean = () => false;
          if (typeof optionExternal === "string") {
            normalizedOptionExternal = () => optionExternal === source;
          } else if (optionExternal instanceof RegExp) {
            normalizedOptionExternal = () => optionExternal.test(source);
          } else if (typeof optionExternal === "function") {
            normalizedOptionExternal = () =>
              optionExternal(source, ...restArgs) || false;
          }
          if (normalizedOptionExternal()) {
            return true;
          }

          if (process.env.NODE_ENV === "production") {
            return source === "./env.json";
          }
        },
      };
    },
    resolveImportMeta: (path, meta) => {
      if (process.env.NODE_ENV === "production") {
        console.log("--");
        console.log(path);
        console.log(meta);
        console.log("");
      }
    },
    buildEnd: () => {
      console.log("--");
      console.log("end");
      console.log("");
    },
  };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createPlugin()],
});
