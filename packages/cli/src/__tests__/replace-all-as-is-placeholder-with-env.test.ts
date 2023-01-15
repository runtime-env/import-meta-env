import { replaceAllAsIsPlaceholderWithEnv } from "../replace-all-as-is-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllAsIsPlaceholderWithEnv", () => {
  test("1", () => {
    // arrange
    const code = `<title>import_meta_env_TITLE</title>`;
    const env = {
      TITLE: "title",
    };

    // act
    const result = replaceAllAsIsPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`"<title>title</title>"`);
  });
});
