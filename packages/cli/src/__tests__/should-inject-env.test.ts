import { placeholder } from "../../../shared";
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

  it("should return true if the code contains placeholder in double quote", () => {
    // arrange
    const code = `${placeholder}.FOO`;

    // act
    const result = shouldInjectEnv(code);

    // assert
    expect(result).toBe(true);
  });

  it("should return true if the code contains placeholder in single quote", () => {
    // arrange
    const code = `${placeholder.replace(/"/g, `'`)}.FOO`;

    // act
    const result = shouldInjectEnv(code);

    // assert
    expect(result).toBe(true);
  });
});
