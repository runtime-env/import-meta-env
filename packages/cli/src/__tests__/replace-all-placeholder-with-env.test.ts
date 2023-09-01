import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("scriptPlaceholder (1)", () => {
    // arrange
    const code = `JSON.parse('"import_meta_env_placeholder"')`;
    const env = {
      KEY1: "value1",
      KEY2: "value2",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"JSON.parse('{"KEY1":"value1","KEY2":"value2"}')"`,
    );
  });

  test("scriptPlaceholder (2)", () => {
    // arrange
    const code = `JSON.parse('\\"import_meta_env_placeholder\\"')`;

    const env = {
      KEY1: "value1",
      KEY2: "value2",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"JSON.parse('{\\"KEY1\\":\\"value1\\",\\"KEY2\\":\\"value2\\"}')"`,
    );
  });

  test("scriptPlaceholder (3)", () => {
    // arrange
    const code = `JSON.parse(\\'\\\\"import_meta_env_placeholder\\\\"\\')`;

    const env = {
      EXISTS1: "value1",
      EXISTS2: "value2",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"JSON.parse(\\'{\\\\"EXISTS1\\\\":\\\\"value1\\\\",\\\\"EXISTS2\\\\":\\\\"value2\\\\"}\\')"`,
    );
  });

  test("scriptPlaceholder (4)", () => {
    // arrange
    const code = `JSON.parse('"import_meta_env_placeholder"')`;
    const env = {
      KEY1: "{\"child1\":\"value1\"}",
      KEY2: "{\"child2\":\"value2\"}",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"JSON.parse('{"KEY1":"{\\\\\\"child1\\\\\\":\\\\\\"value1\\\\\\"}","KEY2":"{\\\\\\"child2\\\\\\":\\\\\\"value2\\\\\\"}"}')"`,
    );
  });
});
