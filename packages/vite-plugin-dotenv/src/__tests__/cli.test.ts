import tmp from "tmp";
import { Args, command, main, resolve } from "../cli";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { defaultPlaceholder } from "../index";

describe("cli", () => {
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

  describe("main", () => {
    test("integration", () => {
      // arrange
      const envFilePath = tmp.fileSync();
      writeFileSync(envFilePath.name, "FOO=bar\nBAZ=qux");
      const envExampleFilePath = tmp.fileSync();
      writeFileSync(envExampleFilePath.name, "FOO=");
      const outputFile = tmp.fileSync();
      writeFileSync(outputFile.name, defaultPlaceholder);
      const parse = jest.fn();
      const opts = jest.fn(
        () =>
          ({
            env: envFilePath.name,
            example: envExampleFilePath.name,
            output: [outputFile.name],
            placeholder: defaultPlaceholder,
          } as Args)
      );
      const cmd = jest.fn(() => ({ parse, opts } as unknown as typeof command));
      const di = {
        command: new cmd() as typeof command,
        resolve,
      };

      // act
      main(di);

      // assert
      expect(readFileSync(outputFile.name, { encoding: "utf8" })).toBe(
        JSON.stringify({ FOO: "bar" })
      );
      const backupFileName = outputFile.name + ".bak";
      expect(existsSync(backupFileName)).toBe(true);
      expect(readFileSync(backupFileName, { encoding: "utf8" })).toBe(
        defaultPlaceholder
      );
    });
  });
});
