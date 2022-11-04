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
  const env = createTempFile("EXISTS=value\nSECRET=***");
  const example = createTempFile("EXISTS=");

  for (let shouldInlineEnv of [true, false]) {
    pluginTester({
      title: `(shouldInlineEnv: ${shouldInlineEnv}) It should ignore`,

      plugin: importMetaEnvBabelPlugin,

      pluginOptions: {
        env: shouldInlineEnv ? env : void 0,
        example,
        shouldInlineEnv,
      },

      tests: [
        {
          title: "new.target.env.EXISTS",
          code: `
function _() {
  new.target.env.EXISTS;
}
          `.trim(),
          output: `
function _() {
  new.target.env.EXISTS;
}
                  `.trim(),
        },

        {
          title: "import.meta.url.EXISTS",
          code: "console.log(() => import.meta.url.EXISTS);",
          output: "console.log(() => import.meta.url.EXISTS);",
        },

        {
          title: "import.meta.env",
          code: "console.log(() => import.meta.env);",
          output: "console.log(() => import.meta.env);",
        },

        {
          title: "import.meta.env.NOT_EXISTS",
          code: "console.log(() => import.meta.env.NOT_EXISTS);",
          output: "console.log(() => import.meta.env.NOT_EXISTS);",
        },
      ],
    });
  }

  pluginTester({
    title: "It should inline with given env",

    plugin: importMetaEnvBabelPlugin,

    pluginOptions: {
      env,
      example,
      shouldInlineEnv: true,
    },

    tests: [
      {
        title: "import.meta.env.EXISTS",
        code: "console.log(() => import.meta.env.EXISTS);",
        output: `console.log(() => "value");`.trim(),
      },
    ],
  });

  pluginTester({
    title: "It should replace with placeholder",

    plugin: importMetaEnvBabelPlugin,

    pluginOptions: {
      example,
      shouldInlineEnv: false,
    },

    tests: [
      {
        title: "import.meta.env.EXISTS",
        code: "console.log(() => import.meta.env.EXISTS);",
        output: `
console.log(
  () => ${placeholder}.EXISTS
);
      `.trim(),
      },
    ],
  });
});
