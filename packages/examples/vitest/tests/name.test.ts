import { test, expect } from "vitest";
import { name } from "../src/name";

test("name", () => {
  expect(name).toBe("vite-plugin-dotenv");
});
