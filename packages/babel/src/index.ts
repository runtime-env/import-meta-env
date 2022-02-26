import type babelCore from "@babel/core";
import { resolveEnv, envFilePath, envExampleFilePath } from "../../shared";

export default function importMetaEnvBabelPlugin({
  template,
  types: t,
}: typeof babelCore): babelCore.PluginObj {
  const env = resolveEnv({
    envFilePath,
    envExampleFilePath,
  });

  const replaceEnv = (template: typeof babelCore.template) =>
    template.expression.ast(`{
    ...${JSON.stringify(env)},
    NODE_ENV: process.env.NODE_ENV || 'test',
    MODE: process.env.NODE_ENV || 'test',
    BASE_URL: '/',
    DEV: process.env.NODE_ENV !== 'production',
    PROD: process.env.NODE_ENV === 'production'
  }`);

  return {
    name: "@import-meta-env/babel",
    visitor: {
      MetaProperty(path) {
        if (!t.isMemberExpression(path.parentPath.node)) return;
        if (!t.isIdentifier(path.parentPath.node.property)) return;

        path.parentPath.replaceWith(replaceEnv(template));
      },
    },
  };
}
