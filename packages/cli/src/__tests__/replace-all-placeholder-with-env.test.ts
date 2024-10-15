import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("scriptPlaceholder with basic code and env values", () => {
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

  test("scriptPlaceholder with slashes for double quotes [1]", () => {
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

  test("scriptPlaceholder with slashes for double quotes [2] and single quotes [1]", () => {
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

  test("scriptPlaceholder with escaped double quotes", () => {
    // arrange
    const code = `JSON.parse('"import_meta_env_placeholder"')`;
    const env = {
      KEY1: '{"child1":"value1"}',
      KEY2: '{"child2":"value2"}',
      KEY3: '["value1", "value2"]',
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"JSON.parse('{"KEY1":"{\\\\\\"child1\\\\\\":\\\\\\"value1\\\\\\"}","KEY2":"{\\\\\\"child2\\\\\\":\\\\\\"value2\\\\\\"}","KEY3":"[\\\\\\"value1\\\\\\", \\\\\\"value2\\\\\\"]"}')"`
    );
  });

  test("scriptPlaceholder with escaped single quotes", () => {
    // arrange
    const code = `JSON.parse('"import_meta_env_placeholder"')`;
    const env = {
      KEY1: "['value3', 'value4']",
      KEY2: "This has 'single quotes' inside",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"JSON.parse('{"KEY1":"[\\\'value3\\\', \\\'value4\\\']","KEY2":"This has \\\'single quotes\\\' inside"}')"`
    );
  });
});
