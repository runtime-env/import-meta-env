import { test, expect } from "vitest";
import { all } from "../src/all";

test("all", () => {
  expect(all).toEqual({
    HELLO: "final-env",
  });
});
