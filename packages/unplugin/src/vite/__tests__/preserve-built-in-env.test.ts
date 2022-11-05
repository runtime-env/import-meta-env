import { preserveViteBuiltInEnv } from "../preserve-built-in-env";

describe("preserve-built-in-env", () => {
  test("preserveViteBuiltInEnv", () => {
    // act
    const replacements = preserveViteBuiltInEnv({ envPrefix: void 0 });

    // assert
    expect(replacements).toMatchInlineSnapshot(`
      [
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.BASE_URL\\\\b/,
          "substitution": "import.meta.env.BASE_URL",
        },
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.MODE\\\\b/,
          "substitution": "import.meta.env.MODE",
        },
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.DEV\\\\b/,
          "substitution": "import.meta.env.DEV",
        },
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.PROD\\\\b/,
          "substitution": "import.meta.env.PROD",
        },
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.SSR\\\\b/,
          "substitution": "import.meta.env.SSR",
        },
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.LEGACY\\\\b/,
          "substitution": "import.meta.env.LEGACY",
        },
        {
          "regexp": /\\\\bimport\\\\\\.meta\\\\\\.env\\\\\\.VITE_/,
          "substitution": "import.meta.env.VITE_",
        },
      ]
    `);
  });
});
