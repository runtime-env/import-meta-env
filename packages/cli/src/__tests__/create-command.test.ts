import tmp from "tmp";
import { createCommand } from "../create-command";

let command = createCommand();

beforeEach(() => {
  command = createCommand();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("create-command", () => {
  test("it should warn if example not found", () => {
    // arrange
    const spy = jest.spyOn(console, "error").mockImplementation();

    // act
    command.exitOverride().parse(["node", "test", "--example", "foo"]);

    // assert
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[31m[import-meta-env]: Example file not found: foo[39m",
        ],
        [
          "[31m[import-meta-env]: Output file not found: dist/**/*, .next/**/*, .nuxt/**/*, .output/**/*, build/**/*[39m",
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
      [
        [
          "[31m[import-meta-env]: Output file not found: foo, bar[39m",
        ],
      ]
    `);
  });

  test("it should warn if output files not found (default)", () => {
    // arrange
    const envExampleFilePath = tmp.fileSync();
    const spy = jest.spyOn(console, "error").mockImplementation();

    // act
    command
      .exitOverride()
      .parse(["node", "test", "--example", envExampleFilePath.name]);

    // assert
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[31m[import-meta-env]: Output file not found: dist/**/*, .next/**/*, .nuxt/**/*, .output/**/*, build/**/*[39m",
        ],
      ]
    `);
  });
});
