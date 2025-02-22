import { test, expect } from "vitest";
import { builtIn } from "../src/built-in";

test("builtIn", () => {
  expect(builtIn).toEqual({
    BASE_URL: "/",
    DEV: true,
    MODE: "test",
    PROD: false,
    SSR: true,
    VITE_PREFIXED_KEY: "compile-time",
  });
});
