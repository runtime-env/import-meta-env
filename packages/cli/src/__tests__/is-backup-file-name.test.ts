import { isBackupFileName } from "../is-backup-file-name";

afterEach(() => {
  jest.clearAllMocks();
});

describe("isBackupFileName", () => {
  test("false", () => {
    // arrange
    const fileName = "foo.js";

    // act
    const result = isBackupFileName(fileName);

    // assert
    expect(result).toBe(false);
  });

  test("true", () => {
    // arrange
    const fileName = "foo.js.bak";

    // act
    const result = isBackupFileName(fileName);

    // assert
    expect(result).toBe(true);
  });
});
