import { writeFileSync } from "fs";
import tmp from "tmp";
import { resolveEnvExample } from "../resolve-env-example";

describe("resolveEnvExample", () => {
  test("resolved env cannot be mutate", () => {
    // arrange
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "OLD=");

    // act
    const env = resolveEnvExample({ envExampleFilePath });

    // assert
    expect(() => (env as string[]).push("")).toThrowErrorMatchingInlineSnapshot(
      `"Cannot add property 1, object is not extensible"`
    );
    expect(() => (env as string[]).pop()).toThrowErrorMatchingInlineSnapshot(
      `"Cannot delete property '0' of [object Array]"`
    );
  });

  test("throw error if .env.example file is not found", () => {
    // arrange
    const envExampleFilePath = tmp.tmpNameSync();

    // assert
    expect(() => resolveEnvExample({ envExampleFilePath })).toThrow(
      ReferenceError(
        `[import-meta-env] failed to load file content from "${envExampleFilePath}".`
      )
    );
  });
});
