import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("scriptPlaceholder", () => {
    // arrange
    const code = `globalThis.import_meta_env="import_meta_env_placeholder"`;
    const env = {
      KEY1: "value1",
      KEY2: "value2",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"globalThis.import_meta_env={"KEY1":"value1","KEY2":"value2"}"`,
    );
  });
});
