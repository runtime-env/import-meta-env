import { test, expect } from "vitest";
import { all } from "../src/all";

test("all", () => {
  expect(all).toEqual({
    BASE_URL: "/",
    DEV: true,
    MODE: "development",
    PROD: false,
    SSR: true,
    LEGACY: false,
    VITE_PREFIXED_KEY: "compile-time",
    HELLO: "import-meta-env",
  });
});
