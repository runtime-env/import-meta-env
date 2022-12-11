import { writeFileSync } from "fs";
import tmp from "tmp";
import { resolveEnv } from "../resolve-env";

beforeEach(() => {
  delete process.env.FOO;
  delete process.env.BAR;
  delete process.env.BAZ;
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("resolveEnv", () => {
  test("should not load environment variables from env file to system", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=file\nBAR=file");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    resolveEnv({ envExampleFilePath, envFilePath });

    // assert
    expect(process.env.FOO).toBe(undefined);
    expect(process.env.BAR).toBe(undefined);
  });

  test("resolve environment variables from env file", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=file\nBAR=file");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    const env = resolveEnv({ envExampleFilePath, envFilePath });

    // assert
    expect(env).toEqual({
      FOO: "file",
    });
  });

  test("resolve environment variables from system only", () => {
    // arrange
    const dir = tmp.dirSync();
    process.chdir(dir.name);
    const envFilePath = tmp.tmpNameSync({
      dir: dir.name,
      name: ".env",
    });
    writeFileSync(envFilePath, "FOO=file");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");
    jest.spyOn(console, "error").mockImplementation(() => {});

    // assert
    expect(() => resolveEnv({ envExampleFilePath, envFilePath: "" })).toThrow();
  });

  test("resolve environment variables from system", () => {
    // arrange
    process.env.FOO = "system";
    process.env.BAR = "system";
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    const env = resolveEnv({ envExampleFilePath, envFilePath: ".env" });

    // assert
    expect(env).toEqual({
      FOO: "system",
    });
  });

  test("resolve environment variables from both system and env file", () => {
    // arrange
    process.env.FOO = "system";
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=file\nBAR=file");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=\nBAR=");

    // act
    const env = resolveEnv({ envExampleFilePath, envFilePath });

    // assert
    expect(env).toEqual({
      FOO: "system",
      BAR: "file",
    });
  });

  test("resolved env cannot be mutate", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "OLD=foo");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "OLD=");

    // act
    const env = resolveEnv({ envExampleFilePath, envFilePath });

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

  test("it should call resolveEnvExampleKeys", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    const envExampleFilePath = tmp.tmpNameSync();

    // assert
    expect(() => resolveEnv({ envExampleFilePath, envFilePath })).toThrow();
  });

  test(`throw if any environment variables is not defined`, () => {
    // arrange
    const spy = jest.spyOn(console, "error").mockImplementation();
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=42");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=1\nBAR=2\nBAZ=3\n");

    // act
    const act = () => resolveEnv({ envExampleFilePath, envFilePath });

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
      - Add them to ${envFilePath.replace(/\\/g, "\\\\")} file.
      - Remove them from ${envExampleFilePath.replace(/\\/g, "\\\\")} file.
      ",
        ],
      ]
    `);
  });
});
