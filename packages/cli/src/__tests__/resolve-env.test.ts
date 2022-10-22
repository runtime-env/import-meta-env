import { writeFileSync } from "fs";
import tmp from "tmp";
import { resolveEnv } from "../../../shared";

afterEach(() => {
  jest.clearAllMocks();
});

describe("resolveEnv", () => {
  test("resolveEnv environment variables from env file", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=bar\nBAZ=qux");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    const env = resolveEnv({ envFilePath, envExampleFilePath });

    // assert
    expect(env).toEqual({
      FOO: "bar",
    });
  });

  test("resolveEnv environment variables from environment", () => {
    // arrange
    process.env.FOO = "bar";
    process.env.BAZ = "qux";
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    const env = resolveEnv({ envExampleFilePath, envFilePath: ".env" });

    // assert
    expect(env).toEqual({
      FOO: "bar",
    });

    // cleanup
    delete process.env.FOO;
    delete process.env.BAZ;
  });

  test("resolved env cannot be mutate", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "OLD=foo");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "OLD=");

    // act
    const env = resolveEnv({ envFilePath, envExampleFilePath });

    // assert
    expect(() => (env.NEW = "")).toThrowErrorMatchingInlineSnapshot(
      `"Cannot add property NEW, object is not extensible"`
    );
    expect(() => delete env.OLD).toThrowErrorMatchingInlineSnapshot(
      `"Cannot delete property 'OLD' of #<Object>"`
    );
    expect(() => (env.OLD = "")).toThrowErrorMatchingInlineSnapshot(
      `"Cannot assign to read only property 'OLD' of object '#<Object>'"`
    );
  });

  test("warn if .env.example file not found", () => {
    // arrange
    const spy = jest.spyOn(console, "warn").mockImplementation();
    const envFilePath = tmp.tmpNameSync();
    const envExampleFilePath = tmp.tmpNameSync();

    // act
    resolveEnv({ envFilePath, envExampleFilePath });

    // assert
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[33m[import-meta-env]: ${envExampleFilePath.replace(
            /\\/g,
            "\\\\"
          )} file not found, skip process.
      [39m",
        ],
      ]
    `);
  });

  test(`throw if any environment variables is not defined`, () => {
    // arrange
    const spy = jest.spyOn(console, "error").mockImplementation();
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=42");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=1\nBAR=2\nBAZ=3\n");

    // act
    const act = () => resolveEnv({ envFilePath, envExampleFilePath });

    // assert
    expect(act).toThrow(
      ReferenceError(`Some environment variables are not defined.`)
    );
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[31m[import-meta-env]: Some environment variables are not defined.[39m",
        ],
        [
          "
      The following variables were defined in ${envExampleFilePath.replace(
        /\\/g,
        "\\\\"
      )} file but are not defined in the environment:

      \`\`\`
      BAR=2
      BAZ=3
      \`\`\`

      Here's what you can do:
      - Set them to environment variables on your system.
      - Add them to .env file.
      - Remove them from ${envExampleFilePath.replace(/\\/g, "\\\\")} file.
      ",
        ],
      ]
    `);
  });
});
