import { unwrapSignalForImportMetaEnvEnv } from "../unwrap-signal-for-import-meta-env-env";
import { accessor } from "../../../../shared/constant";

describe("unwrap-signal-for-import-meta-env-env", () => {
  test("compile-time", () => {
    // arrange
    const code = `
const envs = {
  EXISTS: _wrapSignal(import.meta.env, "EXISTS"),
  NOT_EXISTS: _wrapSignal(import.meta.env, "NOT_EXISTS"),
};
    `.trim();

    // act
    const replacements = unwrapSignalForImportMetaEnvEnv({
      example: ["EXISTS"],
      env: { EXISTS: "value" },
      transformMode: "compile-time",
    });
    let result = code;
    replacements.forEach((replacement) => {
      result = result.replace(replacement.regexp, replacement.substitution);
    });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "const envs = {
        EXISTS: "value",
        NOT_EXISTS: _wrapSignal(import.meta.env, "NOT_EXISTS"),
      };"
    `);
  });
  test("unwrapSignalForImportMetaEnvEnv", () => {
    // arrange
    const code = `
const envs = {
  EXISTS: _wrapSignal(import.meta.env, "EXISTS"),
  NOT_EXISTS: _wrapSignal(import.meta.env, "NOT_EXISTS"),
};
    `.trim();

    // act
    const replacements = unwrapSignalForImportMetaEnvEnv({
      example: ["EXISTS"],
      transformMode: "runtime",
    });
    let result = code;
    replacements.forEach((replacement) => {
      result = result.replace(replacement.regexp, replacement.substitution);
    });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "const envs = {
        EXISTS: ${accessor}.EXISTS,
        NOT_EXISTS: _wrapSignal(import.meta.env, "NOT_EXISTS"),
      };"
    `);
  });
});
