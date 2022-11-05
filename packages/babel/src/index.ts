import { declare } from "@babel/helper-plugin-utils";
import type babelCore from "@babel/core";
import {
  resolveEnv,
  envFilePath as defaultEnvFilePath,
  placeholder,
} from "../../shared";
import { resolveEnvExample } from "../../shared/resolve-env-example";
import { PluginOptions } from "./types";

export default declare<PluginOptions>(({ template, types }, options) => {
  const transformMode: "compile-time" | "runtime" =
    options.transformMode ??
    (process.env.NODE_ENV === "production"
      ? ("runtime" as const)
      : ("compile-time" as const));

  const envExampleFilePath = options.example;
  if (envExampleFilePath === undefined) {
    throw Error(
      `example option is required. Please specify it in the plugin options.`
    );
  }
  const envExample = resolveEnvExample({ envExampleFilePath });

  const env =
    transformMode === "compile-time"
      ? (() => {
          const envFilePath = options.env || defaultEnvFilePath;
          return resolveEnv({
            envFilePath,
            envExampleFilePath,
          });
        })()
      : Object.create(null);

  const replaceEnvForCompileTime = (
    template: typeof babelCore.template,
    property: string
  ) => template.expression.ast(JSON.stringify(env[property]));
  const replaceEnvForRuntime = (
    template: typeof babelCore.template,
    property: string
  ) => template.expression.ast(`${placeholder}.${property}`);

  return {
    name: "@import-meta-env/babel",
    visitor: {
      Identifier(path, state) {
        if (!types.isIdentifier(path)) return;

        // {}.{}
        if (!types.isMemberExpression(path.parentPath)) return;
        // {}.{}.{}
        if (!types.isMemberExpression(path.parentPath.node)) return;
        // {}.{}.{}.{}
        if (!types.isMemberExpression(path.parentPath.node.object)) return;

        // {}.{}.{}.PROPERTY
        if (path.parentPath.computed) return;
        if (!types.isIdentifier(path.parentPath.node.property)) return;

        // {}.{}.env.PROPERTY
        if (!types.isIdentifier(path.parentPath.node.object.property)) return;
        if (path.parentPath.node.object.property.name !== "env") return;

        // import.meta.env.PROPERTY
        if (!types.isMetaProperty(path.parentPath.node.object.object)) return;
        if (path.parentPath.node.object.object.property.name !== "meta") return;
        if (path.parentPath.node.object.object.meta.name !== "import") return;

        // import.meta.env.PUBLIC_PROPERTY
        if (envExample.includes(path.parentPath.node.property.name) === false)
          return;

        if (transformMode === "compile-time") {
          path.parentPath.replaceWith(
            replaceEnvForCompileTime(
              template,
              path.parentPath.node.property.name
            )
          );
        } else {
          path.parentPath.replaceWith(
            replaceEnvForRuntime(template, path.parentPath.node.property.name)
          );
        }
      },
    },
  };
});
