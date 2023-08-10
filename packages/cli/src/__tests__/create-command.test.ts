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
    // act
    expect(() =>
      command.exitOverride().parse(["node", "test", "--example", "foo"]),
    ).toThrow();
  });

  // TODO: remove this line in v1
  test("it should warn if output files not found (legacy)", () => {
    // arrange
    const envExampleFilePath = tmp.fileSync();
    const spyError = jest.spyOn(console, "error").mockImplementation();
    const spyWarn = jest.spyOn(console, "warn").mockImplementation();

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
    expect(spyWarn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[33m[import-meta-env]: Option \`-o, --output\` were deprecated and will be removed in a future release, please use \`-p, --path\` instead.[39m",
        ],
      ]
    `);
    expect(spyError.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[31m[import-meta-env]: Output file not found: foo, bar[39m",
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
        "--path",
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
