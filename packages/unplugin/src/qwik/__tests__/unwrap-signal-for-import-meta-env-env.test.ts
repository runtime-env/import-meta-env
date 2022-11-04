import { unwrapSignalForImportMetaEnvEnv } from "../unwrap-signal-for-import-meta-env-env";

describe("unwrap-signal-for-import-meta-env-env", () => {
  test("unwrapSignalForImportMetaEnvEnv", () => {
    // arrange
    const code = `
const envs = {
  EXISTS: _wrapSignal(import.meta.env, "EXISTS"),
  NOT_EXISTS: _wrapSignal(import.meta.env, "NOT_EXISTS"),
};
    `.trim();

    // act
    const result = unwrapSignalForImportMetaEnvEnv({
      code,
      example: ["EXISTS"],
    });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "const envs = {
        EXISTS: import.meta.env.EXISTS,
        NOT_EXISTS: _wrapSignal(import.meta.env, "NOT_EXISTS"),
      };"
    `);
  });
});
