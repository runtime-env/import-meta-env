import type babelCore from "@babel/core";
import { resolveEnv, envFilePath as defaultEnvFilePath } from "../../shared";

export default function importMetaEnvBabelPlugin({
  template,
  types: t,
}: typeof babelCore): babelCore.PluginObj<{
  opts?: { env?: string; example?: string };
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

  return {
    name: "@import-meta-env/babel",
    visitor: {
      MetaProperty(path, state) {
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
      },
    },
  };
}
