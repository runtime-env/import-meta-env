import { placeholder } from "../../../shared";
import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("it replace placeholder with env object", () => {
    // arrange
    const code = `
      const hello = eval('"${placeholder}"');
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = eval('({\\"HELLO\\":\\"world\\"})');
          "
    `);
  });

  test("it replace placeholder with env", () => {
    // arrange
    const code = `
      const hello = eval('"${placeholder}.HELLO"');
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = eval('\\"world\\"');
          "
    `);
  });

  test("it replace all placeholder with env", () => {
    // arrange
    const code = `
      const foo = eval('"${placeholder}.FOO"');
      const bar = eval('"${placeholder}.BAR"');
    `;
    const env = {
      FOO: "foo",
      BAR: "bar",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const foo = eval('\\"foo\\"');
            const bar = eval('\\"bar\\"');
          "
    `);
  });

  test("it works with escaped double quotes", () => {
    // arrange
    const code = `
      const hello = eval('\\"${placeholder}.HELLO\\"');
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = eval('\\\\\\"world\\\\\\"');
          "
    `);
  });

  test("it should support dynamic key access", () => {
    // arrange
    const code = `
      eval('"${placeholder}"')['dynamicKey'];
    `;
    const env = {
      dynamicKey: "dynamic",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            eval('({\\"dynamicKey\\":\\"dynamic\\"})')['dynamicKey'];
          "
    `);
  });

  test("it should escape HTML entities", () => {
    // arrange
    const code = `
      const hello = eval('"${placeholder}.HELLO"');
    `;
    const env = {
      HELLO:
        "as</script><script>alert('You have an XSS vulnerability!')</script>",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = eval('\\"as\\\\u003C\\\\u002Fscript\\\\u003E\\\\u003Cscript\\\\u003Ealert('You have an XSS vulnerability!')\\\\u003C\\\\u002Fscript\\\\u003E\\"');
          "
    `);
  });
});
