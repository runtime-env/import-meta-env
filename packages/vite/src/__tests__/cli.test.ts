import tmp from "tmp";
import { Args, createCommand, main, resolve } from "../cli";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { placeholder } from "../index";

let command = createCommand();

beforeEach(() => {
  command = createCommand();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("cli", () => {
  describe("command", () => {
    test("it should warn if example not found", () => {
      // arrange
      const spy = jest.spyOn(console, "error").mockImplementation();

      // act
      command.exitOverride().parse(["node", "test", "--example", "foo"]);

      // assert
      expect(spy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[31m[import-meta-env]: Example file not found: foo[39m",
          ],
          Array [
            "[31m[import-meta-env]: Output file not found[39m",
          ],
        ]
      `);
    });

    test("it should warn if output files not found", () => {
      // arrange
      const envExampleFilePath = tmp.fileSync();
      const spy = jest.spyOn(console, "error").mockImplementation();

      // act
      command
        .exitOverride()
        .parse([
          "node",
          "test",
          "--example",
          envExampleFilePath.name,
          "--output",
          "foo",
          "bar",
        ]);

      // assert
      expect(spy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[31m[import-meta-env]: Output file not found: foo, bar[39m",
          ],
        ]
      `);
    });

    test("it should warn if output files not found 2", () => {
      // arrange
      const envExampleFilePath = tmp.fileSync();
      const spy = jest.spyOn(console, "error").mockImplementation();

      // act
      command
        .exitOverride()
        .parse(["node", "test", "--example", envExampleFilePath.name]);

      // assert
      expect(spy.mock.calls).toMatchInlineSnapshot(`
        Array [
          Array [
            "[31m[import-meta-env]: Output file not found[39m",
          ],
        ]
      `);
    });
  });

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
      writeFileSync(outputFile.name, placeholder);
      const parse = jest.fn();
      const opts = jest.fn(
        () =>
          ({
            env: envFilePath.name,
            example: envExampleFilePath.name,
            output: [outputFile.name],
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
        placeholder
      );
    });
  });
});
