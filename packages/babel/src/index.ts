import { declare } from "@babel/helper-plugin-utils";
import type babelCore from "@babel/core";
import { resolveEnv, accessor } from "../../shared";
import { resolveEnvExampleKeys } from "../../shared/resolve-env-example-keys";
import { PluginOptions } from "./types";

export default declare<PluginOptions>(({ template, types }, options) => {
  const transformMode: "compile-time" | "runtime" =
    options.transformMode ??
    (process.env.NODE_ENV === "production"
      ? ("runtime" as const)
      : ("compile-time" as const));

  const envExampleKeys = resolveEnvExampleKeys({
    envExampleFilePath: options.example,
  });

  const env =
    transformMode === "compile-time"
      ? (() => {
          return resolveEnv({
            envExampleFilePath: options.example,
            envFilePath: options.env,
          });
        })()
      : Object.create(null);

  const replaceEnvForRuntime = (
    template: typeof babelCore.template,
    property: string,
  ) => template.expression.ast(`${accessor}.${property}`);

  return {
    name: "@import-meta-env/babel",
    visitor: {
      ExpressionStatement(path) {
        if (transformMode === "runtime") return;

        const assignmentExpression = path.node.expression;
        if (!types.isAssignmentExpression(assignmentExpression)) return;
        if (assignmentExpression.operator !== "=") return;

        const memberExpression = assignmentExpression.left;
        if (!types.isMemberExpression(memberExpression)) return;
        if (memberExpression.computed) return;
        if (!types.isIdentifier(memberExpression.object)) return;
        if (memberExpression.object.name !== "globalThis") return;
        if (!types.isIdentifier(memberExpression.property)) return;
        if (memberExpression.property.name !== "import_meta_env") return;

        const callExpression = assignmentExpression.right;
        if (!types.isCallExpression(callExpression)) return;
        if (!types.isMemberExpression(callExpression.callee)) return;
        if (callExpression.callee.computed) return;
        if (!types.isIdentifier(callExpression.callee.object)) return;
        if (callExpression.callee.object.name !== "JSON") return;
        if (!types.isIdentifier(callExpression.callee.property)) return;
        if (callExpression.callee.property.name !== "parse") return;

        if (callExpression.arguments.length !== 1) return;
        if (!types.isStringLiteral(callExpression.arguments[0])) return;
        try {
          if (
            JSON.parse(callExpression.arguments[0].value) !==
            "import_meta_env_placeholder"
          )
            return;
        } catch {
          return;
        }

        const properties: babelCore.types.ObjectProperty[] = Object.entries(
          env,
        ).map(([key, value]) => {
          return types.objectProperty(
            types.identifier(key),
            types.stringLiteral(value),
          );
        });
        path.replaceWith(
          types.expressionStatement(
            types.assignmentExpression(
              "=",
              types.memberExpression(
                types.identifier("globalThis"),
                types.identifier("import_meta_env"),
              ),
              types.objectExpression(properties),
            ),
          ),
        );
      },
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
        if (
          envExampleKeys.includes(path.parentPath.node.property.name) === false
        )
          return;

        path.parentPath.replaceWith(
          replaceEnvForRuntime(template, path.parentPath.node.property.name),
        );
      },
    },
  };
});
