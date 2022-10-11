import { placeholder } from "../../../../shared";
import { preserveViteBuiltInEnv } from "../preserve-built-in-env";

describe("withhold-built-in-env", () => {
  test("preserveViteBuiltInEnv", () => {
    // arrange
    const code = `
const envs = {
  BASE_URL: (${placeholder}).BASE_URL,
  VITE_FOO: (${placeholder}).VITE_FOO,
  FOO: (${placeholder}).FOO,
  ALL: (${placeholder}),
};
const all = (${placeholder})
      `.trim();

    // act
    const result = preserveViteBuiltInEnv({ code, envPrefix: void 0 });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "const envs = {
        BASE_URL: import.meta.env.BASE_URL,
        VITE_FOO: import.meta.env.VITE_FOO,
        FOO: (${placeholder}).FOO,
        ALL: ({...(${placeholder}),...import.meta.env}),
      };
      const all = ({...(${placeholder}),...import.meta.env})"
    `);
  });
});
