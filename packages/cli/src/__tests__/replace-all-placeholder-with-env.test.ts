import { placeholder } from "../../../shared";
import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("not exists", () => {
    // arrange
    const code = `
      const notExists = ${placeholder}.NOT_EXISTS;
    `;
    const env = {};
    const example = [] as const;

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const notExists = ${placeholder}.NOT_EXISTS;
          "
    `);
  });

  test("exists", () => {
    // arrange
    const code = `
      const exists = ${placeholder}.EXISTS;
    `;
    const env = {
      EXISTS: "value",
    };
    const example = ["EXISTS"];

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const exists = "value";
          "
    `);
  });

  test("multiple", () => {
    // arrange
    const code = `
      const exists1 = ${placeholder}.EXISTS1;
      const exists2 = ${placeholder}.EXISTS2;
    `;
    const env = {
      EXISTS1: "value1",
      EXISTS2: "value2",
    };
    const example = ["EXISTS1", "EXISTS2"];

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const exists1 = "value1";
            const exists2 = "value2";
          "
    `);
  });

  test("single quotes", () => {
    // arrange
    const code = `
      const exists = "${placeholder.replace(/"/g, "'")}.EXISTS";
    `;
    const env = {
      EXISTS: "value",
    };
    const example = ["EXISTS"];

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const exists = "\\"value\\"";
          "
    `);
  });

  test("double quotes", () => {
    // arrange
    const code = `
      const exists = '${placeholder.replace(/'/g, '"')}.EXISTS';
    `;
    const env = {
      EXISTS: "value",
    };
    const example = ["EXISTS"];

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const exists = '"value"';
          "
    `);
  });

  test("spaces", () => {
    // arrange
    const code = `
      const exists1 = ${placeholder.replace(/\s|\t/g, "")}.EXISTS;
      const exists2 = ${placeholder.replace(/\s|\t/g, "  ")}.EXISTS;
      const exists3 = ${placeholder.replace(/\s|\t/g, "    ")}.EXISTS;
    `;
    const env = {
      EXISTS: "value",
    };
    const example = ["EXISTS"];

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const exists1 = "value";
            const exists2 = "value";
            const exists3 = "value";
          "
    `);
  });

  test("escape", () => {
    // arrange
    const code = `
      const exists = ${placeholder}.EXISTS;
    `;
    const env = {
      EXISTS:
        "as</script><script>alert('You have an XSS vulnerability!')</script>",
    };
    const example = ["EXISTS"];

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env, example });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const exists = "as\\u003C\\u002Fscript\\u003E\\u003Cscript\\u003Ealert('You have an XSS vulnerability!')\\u003C\\u002Fscript\\u003E";
          "
    `);
  });
});
