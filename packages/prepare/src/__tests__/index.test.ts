import fs from "fs";
import tmp from "tmp";
import { Args } from "../create-command";
import { GENERATED_BY_HEADER, main } from "../index";

beforeEach(() => {
  const wd = tmp.dirSync();
  process.chdir(wd.name);
  delete process.env.FOO;
});

describe("integration", () => {
  test("default", () => {
    const env = ".env";
    const example = ".env.example";
    const defaults = ".env.local.default";
    const local = ".env.local";
    const userEnvironment = false;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR=bar\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    process.env.BAR = "user-environment";
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR=bar\nFOO=local\n`,
    );
  });

  test("--env", () => {
    const env = ".env" + Math.random().toString(36);
    const example = ".env.example";
    const defaults = ".env.local.default";
    const local = ".env.local";
    const userEnvironment = false;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR=bar\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR=bar\nFOO=local\n`,
    );
  });

  test("--example", () => {
    const env = ".env";
    const example = ".env.example" + Math.random().toString(36);
    const defaults = ".env.local.default";
    const local = ".env.local";
    const userEnvironment = false;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR=bar\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR=bar\nFOO=local\n`,
    );
  });

  test("--path", () => {
    const env = ".env";
    const example = ".env.example";
    const defaults = ".env.local.default" + Math.random().toString(36);
    const local = ".env.local" + Math.random().toString(36);
    const userEnvironment = false;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR=bar\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR=bar\nFOO=local\n`,
    );
  });

  test("--userEnvironment", () => {
    const env = ".env";
    const example = ".env.example";
    const defaults = ".env.local.default";
    const local = ".env.local";
    const userEnvironment = true;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR=bar\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    process.env.BAR = "user-environment";
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR=user-environment\nFOO=local\n`,
    );
  });
});

describe('unit', () => {
  test('does not include dotenv comments in output', () => {
    const env = ".env";
    const example = ".env.example";
    const defaults = ".env.local.default";
    const local = ".env.local";
    const userEnvironment = false;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR=bar #comment\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR=bar\nFOO=local\n`,
    );
  });

  test('includes dotenv strings that contain hashes intact in output', () => {
    const env = ".env";
    const example = ".env.example";
    const defaults = ".env.local.default";
    const local = ".env.local";
    const userEnvironment = false;
    fs.writeFileSync(example, "FOO=\nBAR=\n");
    fs.writeFileSync(defaults, "FOO=foo\nBAR='bar #comment'\nBAZ=baz\n");
    fs.writeFileSync(local, "FOO=local\nBAZ=local\n");
    const args: Args = {
      env,
      example,
      path: [defaults, local],
      userEnvironment,
    };

    main(args);

    expect(fs.readFileSync(env, "utf8")).toEqual(
      `${GENERATED_BY_HEADER}BAR='bar #comment'\nFOO=local\n`,
    );
  });
});
