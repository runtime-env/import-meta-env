import { test, expect } from "vitest";
import { all } from "../src/all";

test("all", () => {
  expect(all).toMatchObject({
    BASE_URL: "/",
    DEV: true,
    MODE: "test",
    PROD: false,
    SSR: true,
    VITE_PREFIXED_KEY: "compile-time",
  });
});
