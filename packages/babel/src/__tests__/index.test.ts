import { writeFileSync } from "fs";
import tmp from "tmp";
import pluginTester from "babel-plugin-tester";
import importMetaEnvBabelPlugin from "../index";
import { placeholder } from "../../../shared";

export const createTempFile = (code: string) => {
  const tmpFile = tmp.fileSync();

  writeFileSync(tmpFile.name, code);

  return tmpFile.name;
};

describe("importMetaEnvBabelPlugin", () => {
  const env = createTempFile("HELLO=foo");
  const example = createTempFile("HELLO=");

  pluginTester({
    title: "should inline env",

    plugin: importMetaEnvBabelPlugin,

    pluginOptions: {
      env,
      example,
      shouldInlineEnv: true,
    },

    tests: [
      {
        title: "It should be transformed to given env (entire env)",
        code: "console.log(() => import.meta.env);",
        output: `
console.log(() => ({
  HELLO: "foo",
}));
          `.trim(),
      },

      {
        title: "It should be transformed to given env (key accessing)",
        code: "console.log(() => import.meta.env.HELLO);",
        output: `
console.log(
  () =>
    ({
      HELLO: "foo",
    }.HELLO)
);
          `.trim(),
      },
    ],
  });

  pluginTester({
    title: "should not inline env",

    plugin: importMetaEnvBabelPlugin,

    pluginOptions: {
      example,
      shouldInlineEnv: false,
    },

    tests: [
      {
        title: "It should be transformed to placeholder (entire env)",
        code: "console.log(() => import.meta.env);",
        output: `
console.log(() => ${placeholder});
          `.trim(),
      },

      {
        title: "It should be transformed to placeholder (key accessing)",
        code: "console.log(() => import.meta.env.HELLO);",
        output: `
console.log(() => ${placeholder}.HELLO);
          `.trim(),
      },
    ],
  });
});
