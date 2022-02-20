import path from "path";
import { Plugin, ResolvedConfig } from "vite";
import colors from "picocolors";
import { writeFileSync } from "fs";
import { config as dotenvConfig } from "dotenv";
import hash from "object-hash";
import { version } from "../package.json";
import { resolve } from "./env";

const DEBUG = false;

export const virtualFile = "import-meta-env";
export const placeholder = "__import_meta_env_placeholder__";
const inlineEnvKeys = ["BASE_URL", "MODE", "DEV", "PROD", "SSR", "LEGACY"];
const unique = (() => {
  const uniqueId = "import_meta_env_unique_id_";
  return (
    uniqueId +
    Array(256 - uniqueId.length)
      .fill("x")
      .join("")
  );
})();

const createPlugin: () => Plugin[] = () => {
  let debugLog = "";

  let config: ResolvedConfig;
  const env: Record<string, string> = resolve({
    envFilePath: ".env",
    envExampleFilePath: ".env.example",
  });

  const virtualId = "\0" + virtualFile;

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
        throw new Error(`[import-meta-env]: SSR is not supported.`);
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
            "\n===import-meta-env===\n";
        } else if (isTransformingVue(code, id)) {
          debugLog += `\n===before transforming vue ${id}===\n` + code;

          code = code.replace(
            /(\<script.*?\>)/,
            `$1\nimport ${unique} from '${virtualFile}';`
          );

          debugLog +=
            `\n===after transforming vue ${id}===\n` +
            code +
            "\n===import-meta-env===\n";
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
          path.join(config.root, "import-meta-env-debug.log"),
          debugLog
        );
      }

      config.logger.info(
        [
          "",
          `${colors.cyan("import-meta-env v" + version)}`,
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
