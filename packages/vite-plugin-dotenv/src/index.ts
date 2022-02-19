import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import colors from "picocolors";
import { writeFileSync } from "fs";
import { config as dotenvConfig } from "dotenv";
import hash from "object-hash";
import { version } from "../package.json";
import { Options } from "./types";

const DEBUG = false;

export const virtualFile = "vite-plugin-dotenv";
export const defaultPlaceholder = "__vite_plugin_dotenv_placeholder__";
const inlineEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD", "SSR", "LEGACY"];
const unique = (() => {
  const uniqueId = "vite_plugin_dotenv_unique_id_";
  return (
    uniqueId +
    Array(256 - uniqueId.length)
      .fill("x")
      .join("")
  );
})();

const createPlugin: ({ placeholder }?: Options) => Plugin[] = (
  pluginOptions = {}
) => {
  let debugLog = "";

  let config: ResolvedConfig;
  let env: Record<string, string> = {};

  const virtualId = "\0" + virtualFile;
  const placeholder = pluginOptions.placeholder || defaultPlaceholder;

  const development = <Plugin>{
    name: "dotenv:development",
    enforce: "pre",
    apply: (_, env) => {
      return env.command === "serve";
    },
    config() {
      return {
        // disable vite built-in environment variable feature
        envPrefix: [],
      };
    },
    configResolved() {
      const parsed = (() => {
        const { parsed, error } = dotenvConfig();
        if (error) {
          return {};
        }
        return { ...parsed! };
      })();
      Object.assign(parsed, process.env);

      const parsedExample = (() => {
        const { parsed, error } = dotenvConfig({ path: ".env.example" });
        if (error) {
          return {};
        }
        return parsed!;
      })();

      const missingKeys: string[] = [];
      Object.keys(parsedExample).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(parsed, key) === false) {
          missingKeys.push(key);
        }

        env[key] = parsed[key];
      });
      if (missingKeys.length) {
        throw new Error(
          `[vite-plugin-dotenv]: The following variables were defined in .env.example but are not present in the environment: ` +
            missingKeys.join(", ")
        );
      }
    },
    transform(code, id) {
      if (id !== virtualId && id.includes("node_modules") === false) {
        inlineEnvKeys.forEach((key) => {
          code = code.replace(
            new RegExp(`import.meta.env.${key}`, "g"),
            unique + `.${key}`
          );
        });

        code = code.replace(/import\.meta\.env/g, JSON.stringify(env));

        inlineEnvKeys.forEach((key) => {
          code = code.replace(
            new RegExp(unique + `.${key}`, "g"),
            `import.meta.env.${key}`
          );
        });
      }

      return code;
    },
  };

  const production = <Plugin>{
    name: "dotenv:pre",
    enforce: "pre",
    apply: (_, env) => {
      return env.command === "build";
    },
    config() {
      return {
        // disable vite built-in environment variable feature
        envPrefix: [],
        build: {
          rollupOptions: {
            output: {
              manualChunks: {
                [virtualFile]: [virtualId],
              },
            },
          },
        },
      };
    },
    configResolved(_config) {
      config = _config;
    },
    resolveId(id, _, options) {
      if (options.ssr) {
        throw new Error(`vite-plugin-dotenv: SSR is not supported.`);
      }

      if (id === virtualFile) {
        return virtualId;
      }

      if (id === virtualId) {
        return virtualId;
      }
    },
    load(id) {
      if (id === virtualId) {
        const parsedExample = (() => {
          const { parsed, error } = dotenvConfig({ path: ".env.example" });
          if (error) {
            return {};
          }
          return parsed!;
        })();
        const hashValue = hash.keys(parsedExample);

        return [
          `console.assert("${hashValue}"); // Invalidate the cache when the .env.example changes.`,
          `const e = ${placeholder};`,
          `export default e;`,
        ].join("\n");
      }
    },
    transform(code, id) {
      if (id !== virtualId && id.includes("node_modules") === false) {
        if (isTransformingJs(code, id)) {
          debugLog += `\n===before transforming [.jt]sx? ${id}===\n` + code;

          code =
            `import ${unique} from '${virtualFile}';\n` +
            code.replace(`import ${unique} from '${virtualFile}';\n`, "");

          debugLog +=
            `\n===after transforming [.jt]sx? ${id}===\n` +
            code +
            "\n===vite-plugin-dotenv===\n";
        } else if (isTransformingVue(code, id)) {
          debugLog += `\n===before transforming vue ${id}===\n` + code;

          code = code.replace(
            /(\<script.*?\>)/,
            `$1\nimport ${unique} from '${virtualFile}';`
          );

          debugLog +=
            `\n===after transforming vue ${id}===\n` +
            code +
            "\n===vite-plugin-dotenv===\n";
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
      html = html.replace(new RegExp(unique, "g"), "import.meta.env");
      return html;
    },
    closeBundle() {
      if (DEBUG) {
        writeFileSync(
          path.join(config.root, "vite-plugin-dotenv-debug.log"),
          debugLog
        );
      }

      config.logger.info(
        [
          "",
          `${colors.cyan("vite-plugin-dotenv v" + version)}`,
          `${colors.green("✓")} environment files are generated.`,
          colors.yellow(
            `Remember to inject environment variables before serving your application.`
          ),
          "",
        ].join("\n")
      );
    },
  };

  return [development, production];
};

export default createPlugin;

const isTransformingJs = (code: string, id: string) =>
  [".js", ".ts", ".jsx", ".tsx"].some((ext) => id.endsWith(ext)) &&
  id.includes("?vue&type=template") === false;

const isTransformingVue = (code: string, id: string) => id.endsWith(".vue");
