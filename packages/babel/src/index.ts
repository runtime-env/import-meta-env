// @ts-nocheck
import { parseExpression, type ParseResult } from "@babel/parser";
import type babelCore from "@babel/core";
import {
  resolveEnv,
  envFilePath as defaultEnvFilePath,
  placeholder,
} from "../../shared";
import { PluginOptions } from "./types";

export default function importMetaEnvBabelPlugin({
  types: t,
}: typeof babelCore): babelCore.PluginObj<{
  opts?: PluginOptions;
}> {
  return {
    name: "@final-env/babel",
    visitor: {
      Expression(path, state) {
        const shouldInlineEnv =
          state.opts?.shouldInlineEnv ?? process.env.NODE_ENV !== "production";
        if (shouldInlineEnv) {
          let envFilePath = state.opts?.env || defaultEnvFilePath;
          let envExampleFilePath: string | undefined = state.opts?.example;
          if (envExampleFilePath === undefined) {
            throw Error(
              `example option is required. Please specify it in the plugin options.`
            );
          }
          const env = resolveEnv({
            envFilePath,
            envExampleFilePath,
            exampleOnly: true,
          });

          const types = new Map<
            ParseResult<babelCore.types.Expression>,
            {
              key: ParseResult<babelCore.types.Expression>;
              value: ParseResult<babelCore.types.Expression>;
              originalKey: string;
            }[]
          >();
          ([] as [string, string][])
            .concat(
              Object.keys(env).map((key) => {
                return [`__ENV__.${key}`, `eval('"${env[key]}"')`];
              }),
              [["__ENV__", `eval('(${JSON.stringify(env)})')`]]
            )
            .forEach(([key, value]) => {
              const kNode = parseExpression(key);
              const vNode = parseExpression(value);

              const candidates: {
                key: typeof kNode;
                value: typeof vNode;
                originalKey: string;
              }[] = types.get(kNode.type) || [];
              candidates.push({ key: kNode, value: vNode, originalKey: key });
              types.set(kNode.type, candidates);

              for (let i = 0; i < candidates.length - 1; i++) {
                if (!t.isNodesEquivalent(candidates[i].key, kNode)) {
                  continue;
                }

                throw new Error(
                  `Expressions ${JSON.stringify(
                    candidates[i].originalKey
                  )} and ${JSON.stringify(key)} conflict`
                );
              }
            });

          const values = new Set();
          types.forEach((candidates) => {
            candidates.forEach((candidate) => {
              values.add(candidate.value);
            });
          });

          if (values.has(path.node)) {
            path.skip();
            return;
          }

          const candidates = types.get(path.node.type);
          if (!candidates) {
            return;
          }

          for (const { key, value } of candidates) {
            if (t.isNodesEquivalent(key, path.node)) {
              try {
                t.validate(path.parent, path.key.toString(), value);
              } catch (err) {
                if (!(err instanceof TypeError)) {
                  throw err;
                }
                path.skip();
                return;
              }
              path.replaceWith(value);
              return;
            }
          }
        } else {
          let envFilePath = state.opts?.env || defaultEnvFilePath;
          let envExampleFilePath: string | undefined = state.opts?.example;
          if (envExampleFilePath === undefined) {
            throw Error(
              `example option is required. Please specify it in the plugin options.`
            );
          }
          const env = resolveEnv({
            envFilePath,
            envExampleFilePath,
            exampleOnly: true,
          });

          const types = new Map<
            ParseResult<babelCore.types.Expression>,
            {
              key: ParseResult<babelCore.types.Expression>;
              value: ParseResult<babelCore.types.Expression>;
              originalKey: string;
            }[]
          >();
          ([] as [string, string][])
            .concat(
              Object.keys(env).map((key) => {
                return [`__ENV__.${key}`, `eval('"${placeholder}.${key}"')`];
              }),
              [["__ENV__", `eval('"${placeholder}"')`]]
            )
            .forEach(([key, value]) => {
              const kNode = parseExpression(key);
              const vNode = parseExpression(value);

              const candidates = types.get(kNode.type) || [];
              candidates.push({ key: kNode, value: vNode, originalKey: key });
              types.set(kNode.type, candidates);

              for (let i = 0; i < candidates.length - 1; i++) {
                if (!t.isNodesEquivalent(candidates[i].key, kNode)) {
                  continue;
                }

                throw new Error(
                  `Expressions ${JSON.stringify(
                    candidates[i].originalKey
                  )} and ${JSON.stringify(key)} conflict`
                );
              }
            });

          const values = new Set();
          types.forEach((candidates) => {
            candidates.forEach((candidate) => {
              values.add(candidate.value);
            });
          });

          if (values.has(path.node)) {
            path.skip();
            return;
          }

          const candidates = types.get(path.node.type);
          if (!candidates) {
            return;
          }

          for (const { key, value } of candidates) {
            if (t.isNodesEquivalent(key, path.node)) {
              try {
                t.validate(path.parent, path.key.toString(), value);
              } catch (err) {
                if (!(err instanceof TypeError)) {
                  throw err;
                }
                path.skip();
                return;
              }
              path.replaceWith(value);
              return;
            }
          }
        }
      },
    },
  };
}
