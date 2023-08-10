import { existsSync, readFileSync, writeFileSync } from "fs";
import tmp from "tmp";
import { tryToRestore } from "../try-to-restore";
import { backupFileExt } from "../shared";

afterEach(() => {
  jest.clearAllMocks();
});

describe("restore", () => {
  test("it should override original file", () => {
    // arrange
    const dir = tmp.dirSync();
    const file = tmp.fileSync({
      dir: dir.name,
    });
    writeFileSync(file.name, "foo");
    const backupFileName = file.name + backupFileExt;
    writeFileSync(backupFileName, "bar");

    // act
    tryToRestore(backupFileName);

    // assert
    expect(existsSync(file.name)).toBe(true);
    expect(readFileSync(file.name, "utf8")).toBe("bar");
  });

  test("it should throw error if passing file is not a valid backup file name", () => {
    // arrange
    const originalFileName = "foo/bar.js";
    const invalidBackupFileName = originalFileName + ".invalid";

    // act
    const act = () => tryToRestore(invalidBackupFileName);

    // assert
    expect(act).toThrowErrorMatchingInlineSnapshot(
      `"Invalid backup file name "foo/bar.js.invalid""`,
    );
  });

  test("it should ignore if passing file does not exists", () => {
    // arrange
    const originalFileName = "foo/bar.js";
    const notExistsBackupFileName = originalFileName + backupFileExt;

    // act
    const act = () => tryToRestore(notExistsBackupFileName);

    // assert
    expect(act).not.toThrow();
    expect(existsSync(originalFileName)).toBe(false);
  });
});
