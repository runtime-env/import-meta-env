import { writeFileSync } from "fs";
import tmp from "tmp";
import { resolveEnvExampleKeys } from "../resolve-env-example-keys";

describe("resolveEnvExampleKeys", () => {
  test("it should works", () => {
    // arrange
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=file\nBAR=file");

    // act
    const envExampleKeys = resolveEnvExampleKeys({ envExampleFilePath });

    // assert
    expect(envExampleKeys).toEqual(["FOO", "BAR"]);
  });

  test("resolved env cannot be mutate", () => {
    // arrange
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "OLD=");

    // act
    const envExampleKeys = resolveEnvExampleKeys({ envExampleFilePath });

    // assert
    expect(() =>
      (envExampleKeys as string[]).push(""),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Cannot add property 1, object is not extensible"`,
    );
    expect(() =>
      (envExampleKeys as string[]).pop(),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Cannot delete property '0' of [object Array]"`,
    );
  });

  test("throw error if .env.example file is not found", () => {
    // arrange
    const envExampleFilePath = tmp.tmpNameSync();

    // assert
    expect(() => resolveEnvExampleKeys({ envExampleFilePath })).toThrow(
      ReferenceError(
        `[import-meta-env] failed to load file content from "${envExampleFilePath}".`,
      ),
    );
  });
});
