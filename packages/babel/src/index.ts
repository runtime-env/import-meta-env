import { declare } from "@babel/helper-plugin-utils";
import type babelCore from "@babel/core";
import { NodePath } from "@babel/core";
import { resolveEnv, envFilePath as defaultEnvFilePath } from "../../shared";
import { PluginOptions } from "./types";

export default declare<PluginOptions>(({ template, types: t }, options) => {
  const now = Date.now();

  // an unique id to avoid naming conflicts
  const id = `import_meta_env_${now}`;

  // a random number to invalid cache
  const fileName = `import_meta_env_${now}.js`;

  let env: Record<string, string> | undefined = undefined;

  const replaceEnv = (template: typeof babelCore.template) =>
    template.expression.ast(JSON.stringify(env));
  const replaceEnvForProd = (template: typeof babelCore.template) =>
    template.expression.ast(id);

  return {
    name: "@import-meta-env/babel",
    visitor: {
      MetaProperty(path, state) {
        if (!t.isMemberExpression(path.parentPath.node)) return;
        if (!t.isIdentifier(path.parentPath.node.property)) return;
        if (path.parentPath.node.property.name !== "env") return;
        if ((path.parentPath.node.object as any)?.meta?.name !== "import")
          return;

        const shouldInlineEnv =
          options.shouldInlineEnv ?? process.env.NODE_ENV !== "production";
        if (shouldInlineEnv) {
          if (env === undefined) {
            let envFilePath = options.env || defaultEnvFilePath;
            let envExampleFilePath: string | undefined = options.example;
            if (envExampleFilePath === undefined) {
              throw Error(
                `example option is required. Please specify it in the plugin options.`
              );
            }

            env = resolveEnv({
              envFilePath,
              envExampleFilePath,
            });
          }

          path.parentPath.replaceWith(replaceEnv(template));
        } else {
          path.parentPath.replaceWith(replaceEnvForProd(template));

          let program: null | NodePath = path;
          while (program?.isProgram() === false) {
            program = program?.parentPath;
          }
          if (program === null || !program.isProgram()) return;
          const body = program.get("body");
          if (!Array.isArray(body)) return;
          for (const path of body) {
            if (!path.isImportDeclaration()) break;
            const specifiers = path.get("specifiers");
            if (!Array.isArray(specifiers)) break;
            for (const specifier of specifiers) {
              if (!specifier.isImportDefaultSpecifier()) break;

              const local = specifier.get("local");
              const container = local.container;
              if (Array.isArray(container)) break;
              if ((container as any).local?.name !== id) break;

              return;
            }
          }

          body[0]?.insertBefore(
            template(`import ${id} from "${fileName}"`, {
              sourceType: "module",
            })()
          );
        }
      },
    },
  };
});
