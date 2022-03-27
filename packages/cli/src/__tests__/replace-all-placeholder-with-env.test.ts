import { placeholder } from "../../../shared";
import { replaceAllPlaceholderWithEnv } from "../replace-all-placeholder-with-env";

afterEach(() => {
  jest.clearAllMocks();
});

describe("replaceAllPlaceholderWithEnv", () => {
  test("it replace placeholder with env", () => {
    // arrange
    const code = `
      const hello = '${placeholder}';
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = '{\\"HELLO\\":\\"world\\"}';
          "
    `);
  });

  test("it replace all placeholder with env", () => {
    // arrange
    const code = `
      const foo = '${placeholder}'.FOO;
      const bar = '${placeholder}'.BAR;
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
            const foo = '{\\"FOO\\":\\"foo\\",\\"BAR\\":\\"bar\\"}'.FOO;
            const bar = '{\\"FOO\\":\\"foo\\",\\"BAR\\":\\"bar\\"}'.BAR;
          "
    `);
  });

  test("it works with single quotes", () => {
    // arrange
    const code = `
      const hello = ${placeholder.replace(/^"/, "'").replace(/"$/, "'")}.HELLO;
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = \\"world\\";
          "
    `);
  });

  test("it works with double quotes", () => {
    // arrange
    const code = `
      const hello = ${placeholder.replace(/^'/, '"').replace(/'$/, '"')}.HELLO;
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const hello = \\"world\\";
          "
    `);
  });

  test("it should works with arrow function", () => {
    // arrange
    const code = `
      ()=>${placeholder}.HELLO;
      () =>

          ${placeholder}.HELLO;
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            ()=>\\"world\\";
            () =>

                \\"world\\";
          "
    `);
  });

  test("it should support dynamic key access", () => {
    // arrange
    const code = `
      ${placeholder}['dynamicKey'];
    `;
    const env = {
      dynamicKey: "dynamic",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            {\\"dynamicKey\\":\\"dynamic\\"}['dynamicKey'];
          "
    `);
  });

  test("it should not replace placeholder which contains zero-width space", () => {
    // arrange
    const code = `
      ${placeholder.slice(0, 8) + "\u200b" + placeholder.slice(8)}.HELLO;
    `;
    const env = {
      HELLO: "world",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            '__impor​t_meta_env_placeholder__'.HELLO;
          "
    `);
  });

  test("it should escape HTML entities", () => {
    // arrange
    const code = `
      const hello = '${placeholder}'.HELLO;
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
            const hello = '{\\"HELLO\\":\\"as\\\\u003C\\\\u002Fscript\\\\u003E\\\\u003Cscript\\\\u003Ealert('You have an XSS vulnerability!')\\\\u003C\\\\u002Fscript\\\\u003E\\"}'.HELLO;
          "
    `);
  });

  test("it should NOT minimize when env key is part of accessing key", () => {
    // arrange
    const code = `
      const shouldBeUndefined = ${placeholder
        .replace(/^'/, '"')
        .replace(/'$/, '"')}.KEY;
    `;
    const env = {
      K: "value",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const shouldBeUndefined = {\\"K\\":\\"value\\"}.KEY;
          "
    `);
  });

  test("it should minimize when placeholder is wrapped with parentheses", () => {
    // arrange
    const code = `
      const value = (${placeholder.replace(/^'/, '"').replace(/'$/, '"')}).KEY;
    `;
    const env = {
      KEY: "value",
    };

    // act
    const result = replaceAllPlaceholderWithEnv({ code, env });

    // assert
    expect(result).toMatchInlineSnapshot(`
      "
            const value = \\"value\\";
          "
    `);
  });
});
