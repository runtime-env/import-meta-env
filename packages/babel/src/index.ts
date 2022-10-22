import type babelCore from "@babel/core";
import {
  resolveEnv,
  envFilePath as defaultEnvFilePath,
  placeholder,
} from "../../shared";
import { PluginOptions } from "./types";

export default function importMetaEnvBabelPlugin({
  template,
  types: t,
}: typeof babelCore): babelCore.PluginObj<{
  opts?: PluginOptions;
}> {
  let env: Record<string, string> | undefined = undefined;

  const replaceEnv = (template: typeof babelCore.template) =>
    template.expression.ast(JSON.stringify(env));
  const replaceEnvForProd = (template: typeof babelCore.template) =>
    template.expression.ast(placeholder);

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
          state.opts?.shouldInlineEnv ?? process.env.NODE_ENV !== "production";
        if (shouldInlineEnv) {
          if (env === undefined) {
            let envFilePath = state.opts?.env || defaultEnvFilePath;
            let envExampleFilePath: string | undefined = state.opts?.example;
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
        }
      },
    },
  };
}
