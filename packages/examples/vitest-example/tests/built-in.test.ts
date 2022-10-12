import { test, expect } from "vitest";
import { builtIn } from "../src/built-in";

test("builtIn", () => {
  expect(builtIn).toEqual({
    BASE_URL: "/",
    DEV: true,
    MODE: "development",
    PROD: false,
    SSR: true,
    LEGACY: false,
    VITE_PREFIXED_KEY: "compile-time",
  });
});
