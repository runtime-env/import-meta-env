import tmp from "tmp";
import { Args, createCommand, main } from "..";
import { resolve, placeholder } from "../../../shared";
import { existsSync, readFileSync, writeFileSync } from "fs";

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
