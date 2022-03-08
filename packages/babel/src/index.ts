import type babelCore from "@babel/core";
import {
  resolveEnv,
  envFilePath as defaultEnvFilePath,
  placeholder,
} from "../../shared";

export default function importMetaEnvBabelPlugin({
  template,
  types: t,
}: typeof babelCore): babelCore.PluginObj<{
  opts?: { env?: string; example?: string; shouldInlineEnv?: boolean };
}> {
  let env: Record<string, string> | undefined = undefined;

  const isVite =
    process.env.npm_package_devDependencies_vite ||
    process.env.npm_package_dependencies_vite;
  const viteSpecificEnv = isVite
    ? {
        NODE_ENV: process.env.NODE_ENV || "test",
        MODE: process.env.NODE_ENV || "test",
        BASE_URL: "/",
        DEV: process.env.NODE_ENV !== "production",
        PROD: process.env.NODE_ENV === "production",
      }
    : {};

  const replaceEnv = (template: typeof babelCore.template) =>
    template.expression.ast(`{
    ...${JSON.stringify(env)},
    ...${JSON.stringify(viteSpecificEnv)},
  }`);
  const replaceEnvForProd = (template: typeof babelCore.template) =>
    template.expression.ast(`({ env: ${placeholder} })`);

  return {
    name: "@import-meta-env/babel",
    visitor: {
      MetaProperty(path, state) {
        const shouldInlineEnv =
          state.opts?.shouldInlineEnv ?? process.env.NODE_ENV !== "production";
        if (shouldInlineEnv) {
          if (!t.isMemberExpression(path.parentPath.node)) return;
          if (!t.isIdentifier(path.parentPath.node.property)) return;

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
          path.replaceWith(replaceEnvForProd(template));
        }
      },
    },
  };
}
