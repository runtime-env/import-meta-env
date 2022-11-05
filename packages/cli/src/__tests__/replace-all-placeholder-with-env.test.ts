import { scriptPlaceholder } from "../../../shared";
import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("scriptPlaceholder", () => {
    // arrange
    const code = scriptPlaceholder;
    const env = {
      EXISTS1: "value1",
      EXISTS2: "value2",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(
      `"<script>globalThis.import_meta_env={"EXISTS1":"value1","EXISTS2":"value2"}</script>"`
    );
  });
});
