import { writeFileSync } from "fs";
import tmp from "tmp";
import pluginTester from "babel-plugin-tester";
import importMetaEnvBabelPlugin from "../index";

export const createTempFile = (code: string) => {
  const tmpFile = tmp.fileSync();

  writeFileSync(tmpFile.name, code);

  return tmpFile.name;
};

let dateSpy: jest.SpyInstance;

beforeEach(() => {
  dateSpy = jest.spyOn(Date, "now").mockImplementation(() => 1234);
});

afterEach(() => {
  dateSpy.mockRestore();
});

describe("importMetaEnvBabelPlugin", () => {
  const env = createTempFile("HELLO=foo");
  const example = createTempFile("HELLO=");

  pluginTester({
    title: "should ignore non-import.meta properties",

    plugin: importMetaEnvBabelPlugin,

    pluginOptions: {
      env,
      example,
      shouldInlineEnv: true,
    },

    tests: [
      {
        title: "It should ignore non-import.meta properties 1",
        code: `
function _() {
  new.target.env;
}
          `.trim(),
        output: `
function _() {
  new.target.env;
}
                  `.trim(),
      },
    ],
  });

  pluginTester({
    title: "should ignore non-env properties",

    plugin: importMetaEnvBabelPlugin,

    pluginOptions: {
      env,
      example,
      shouldInlineEnv: true,
    },

    tests: [
      {
        title: "It should ignore non-env-properties 1",
        code: "console.log(() => import.meta);",
        output: "console.log(() => import.meta);",
      },

      {
        title: "It should ignore non-env-properties 2",
        code: "console.log(() => import.meta.url);",
        output: "console.log(() => import.meta.url);",
      },
    ],
  });

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
        title: "It should be transformed (entire env)",
        code: "console.log(() => import.meta.env);",
        output: `
import import_meta_env_1234 from "import_meta_env_1234.js";
console.log(() => import_meta_env_1234);
          `.trim(),
      },

      {
        title: "It should be transformed (key accessing)",
        code: "console.log(() => import.meta.env.HELLO);",
        output: `
import import_meta_env_1234 from "import_meta_env_1234.js";
console.log(() => import_meta_env_1234.HELLO);
          `.trim(),
      },

      {
        title: "It should only importing virtual file once",
        code: `
console.log(() => import.meta.env.HELLO);
console.log(() => import.meta.env.HELLO2);
`,
        output: `
import import_meta_env_1234 from "import_meta_env_1234.js";
console.log(() => import_meta_env_1234.HELLO);
console.log(() => import_meta_env_1234.HELLO2);
          `.trim(),
      },
    ],
  });
});
