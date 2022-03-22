import { test, expect } from "vitest";
import { builtIn } from "../src/built-in";

test("builtIn", () => {
  expect(builtIn).toEqual({
    BASE_URL: "/",
    DEV: true,
    HELLO: "import-meta-env",
    MODE: "development",
    PROD: false,
    SSR: true,
    LEGACY: false,
  });
});
