import { writeFileSync } from "fs";
import tmp from "tmp";
import { resolveEnvExample } from "../resolve-env-example";

afterEach(() => {
  jest.clearAllMocks();
});

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

  test("throw error if .env.example file not found", () => {
    // arrange
    const spy = jest.spyOn(console, "error").mockImplementation();
    const envExampleFilePath = tmp.tmpNameSync();

    // act
    resolveEnvExample({ envExampleFilePath });

    // assert
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[31m[import-meta-env] No .env.example file found.[39m",
        ],
      ]
    `);
  });
});
