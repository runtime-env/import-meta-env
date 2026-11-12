import { writeFileSync } from "fs";
import tmp from "tmp";
import { unpluginFactory } from "..";

const code = "console.log(import.meta.env.API_SECRET)";
const id = "/w/src/a.js";
const compileTimeCode = 'console.log("build-machine-value")';
const runtimeCode =
  "console.log(Object.create(globalThis.import_meta_env || null).API_SECRET)";

const createOptions = (transformMode?: "compile-time" | "runtime") => {
  const example = tmp.tmpNameSync();
  writeFileSync(example, "API_SECRET=");
  const env = tmp.tmpNameSync();
  writeFileSync(env, "API_SECRET=build-machine-value");
  return { example, env, transformMode };
};

const transform = (plugin: any) => plugin.transform(code, id)?.code ?? code;

describe("transformMode", () => {
  const nodeEnv = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = nodeEnv;
  });

  describe("farm", () => {
    const setup = (
      transformMode: undefined | "compile-time" | "runtime",
      nodeEnv: string,
    ) => {
      process.env.NODE_ENV = nodeEnv;
      const plugin: any = unpluginFactory(createOptions(transformMode), {
        framework: "farm",
      });
      plugin.farm.configResolved();
      return transform(plugin);
    };

    test("respects an explicit runtime transformMode", () => {
      expect(setup("runtime", "development")).toBe(runtimeCode);
    });

    test("respects an explicit compile-time transformMode", () => {
      expect(setup("compile-time", "production")).toBe(compileTimeCode);
    });

    test("defaults to compile-time outside production", () => {
      expect(setup(undefined, "development")).toBe(compileTimeCode);
    });

    test("defaults to runtime in production", () => {
      expect(setup(undefined, "production")).toBe(runtimeCode);
    });
  });

  describe("rspack", () => {
    const setup = (
      transformMode: undefined | "compile-time" | "runtime",
      mode: string,
    ) => {
      const plugin: any = unpluginFactory(createOptions(transformMode), {
        framework: "rspack",
      });
      plugin.rspack({ options: { mode } });
      return transform(plugin);
    };

    test("respects an explicit compile-time transformMode", () => {
      expect(setup("compile-time", "production")).toBe(compileTimeCode);
    });

    test("respects an explicit runtime transformMode", () => {
      expect(setup("runtime", "development")).toBe(runtimeCode);
    });

    test("defaults to compile-time outside production", () => {
      expect(setup(undefined, "development")).toBe(compileTimeCode);
    });

    test("defaults to runtime in production", () => {
      expect(setup(undefined, "production")).toBe(runtimeCode);
    });
  });
});
