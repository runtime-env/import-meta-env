import { writeFileSync, mkdirSync } from "fs";
import tmp from "tmp";
import { resolveOutputFileNames } from "../resolve-output-file-names";

afterEach(() => {
  jest.clearAllMocks();
});

describe("resolveOutputFileNames", () => {
  test("it should accepts an array", () => {
    // act
    const act = () => resolveOutputFileNames([]);

    // assert
    expect(act).not.toThrow();
  });

  test("it should return file names in multiple globs", () => {
    // arrange
    const tmpDir1 = tmp.dirSync();
    writeFileSync(`${tmpDir1.name}/foo`, "", "utf8");
    const tmpDir2 = tmp.dirSync();
    writeFileSync(`${tmpDir2.name}/bar`, "", "utf8");

    // act
    const result = resolveOutputFileNames([
      tmpDir1.name + "/*",
      tmpDir2.name + "/*",
    ]);

    // assert
    expect(result).toEqual([`${tmpDir1.name}/foo`, `${tmpDir2.name}/bar`]);
  });

  test("it should return file names only", () => {
    // arrange
    const tmpDir = tmp.dirSync();
    writeFileSync(`${tmpDir.name}/foo`, "", "utf8");
    mkdirSync(`${tmpDir.name}/bar`);

    // act
    const result = resolveOutputFileNames([tmpDir.name + "/*"]);

    // assert
    expect(result).toEqual([`${tmpDir.name}/foo`]);
  });

  test("it should return nested file names", () => {
    // arrange
    const tmpDir = tmp.dirSync();
    writeFileSync(`${tmpDir.name}/foo`, "", "utf8");
    mkdirSync(`${tmpDir.name}/bar`);
    writeFileSync(`${tmpDir.name}/bar/baz`, "", "utf8");

    // act
    const result = resolveOutputFileNames([tmpDir.name + "/**/*"]);

    // assert
    expect(result).toEqual([`${tmpDir.name}/bar/baz`, `${tmpDir.name}/foo`]);
  });
});
