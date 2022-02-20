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
});
