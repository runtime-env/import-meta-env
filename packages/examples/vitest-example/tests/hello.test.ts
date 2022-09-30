import { test, expect } from "vitest";
import { hello } from "../src/hello";

test("hello", () => {
  expect(hello).toBe("final-env");
});
