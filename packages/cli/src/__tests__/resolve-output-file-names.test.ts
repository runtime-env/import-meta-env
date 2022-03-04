import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
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

  test("it should call glob.sync", () => {
    // arrange
    const tmpDir = tmp.dirSync();
    writeFileSync(resolve(tmpDir.name, "foo"), "", "utf8");
    const tmpDirGlob = resolve(tmpDir.name, "**", "*");
    const spy = jest.spyOn(require("glob"), "sync");

    // act
    resolveOutputFileNames([tmpDirGlob]);

    // assert
    expect(spy).toHaveBeenCalledWith(tmpDirGlob);
  });

  test("it should return file names in multiple globs", () => {
    // arrange
    const tmpDir1 = tmp.dirSync();
    writeFileSync(resolve(tmpDir1.name, "foo"), "", "utf8");
    const tmpDir2 = tmp.dirSync();
    writeFileSync(resolve(tmpDir2.name, "bar"), "", "utf8");

    // act
    const result = resolveOutputFileNames([
      resolve(tmpDir1.name, "*"),
      resolve(tmpDir2.name, "*"),
    ]);

    // assert
    expect(result).toEqual([
      resolve(tmpDir1.name, "foo"),
      resolve(tmpDir2.name, "bar"),
    ]);
  });

  test("it should return file names only", () => {
    // arrange
    const tmpDir = tmp.dirSync();
    writeFileSync(resolve(tmpDir.name, "foo"), "", "utf8");
    mkdirSync(resolve(tmpDir.name, "bar"));

    // act
    const result = resolveOutputFileNames([resolve(tmpDir.name, "*")]);

    // assert
    expect(result).toEqual([resolve(tmpDir.name, "foo")]);
  });

  test("it should return nested file names", () => {
    // arrange
    const tmpDir = tmp.dirSync();
    writeFileSync(resolve(tmpDir.name, "foo"), "", "utf8");
    mkdirSync(resolve(tmpDir.name, "bar"));
    writeFileSync(resolve(tmpDir.name, "bar", "baz"), "", "utf8");

    // act
    const result = resolveOutputFileNames([resolve(tmpDir.name, "**", "*")]);

    // assert
    expect(result).toEqual([
      resolve(tmpDir.name, "bar", "baz"),
      resolve(tmpDir.name, "foo"),
    ]);
  });
});
