import { test, expect } from "vitest";
import { all } from "../src/all";

test("all", () => {
  expect(all).toEqual({
    BASE_URL: "/",
    DEV: true,
    HELLO: "import-meta-env",
    MODE: "development",
    PROD: false,
    SSR: true,
    LEGACY: false,
  });
});
