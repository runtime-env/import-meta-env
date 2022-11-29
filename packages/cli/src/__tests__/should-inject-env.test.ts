import { shouldInjectEnv } from "../should-inject-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("shouldInjectEnv", () => {
  it("should return false if the code does not contains placeholder", () => {
    // arrange
    const code = "'foo';";

    // act
    const result = shouldInjectEnv(code);

    // assert
    expect(result).toBe(false);
  });

  it("should return true if the code contains script placeholder (1)", () => {
    // arrange
    const code = `JSON.parse('"import_meta_env_placeholder"')`;

    // act
    const result = shouldInjectEnv(code);

    // assert
    expect(result).toBe(true);
  });

  it("should return true if the code contains script placeholder (2)", () => {
    // arrange
    const code = `JSON.parse('\\"import_meta_env_placeholder\\"')`;

    // act
    const result = shouldInjectEnv(code);

    // assert
    expect(result).toBe(true);
  });

  it("should return true if the code contains script placeholder (3)", () => {
    // arrange
    const code = `JSON.parse(\\'\\\\"import_meta_env_placeholder\\\\"\\')`;

    // act
    const result = shouldInjectEnv(code);

    // assert
    expect(result).toBe(true);
  });
});
