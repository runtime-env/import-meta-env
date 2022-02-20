import { writeFileSync } from "fs";
import tmp from "tmp";
import { resolve } from "../env";

describe("resolve", () => {
  test("resolve environment variables from env file", () => {
    // arrange
    const envFilePath = tmp.tmpNameSync();
    writeFileSync(envFilePath, "FOO=bar\nBAZ=qux");
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    const env = resolve({ envFilePath, envExampleFilePath });

    // assert
    expect(env).toEqual({
      FOO: "bar",
    });
  });

  test("resolve environment variables from environment", () => {
    // arrange
    process.env.FOO = "bar";
    process.env.BAZ = "qux";
    const envExampleFilePath = tmp.tmpNameSync();
    writeFileSync(envExampleFilePath, "FOO=");

    // act
    const env = resolve({ envExampleFilePath, envFilePath: ".env" });

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
    const env = resolve({ envFilePath, envExampleFilePath });

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
});
