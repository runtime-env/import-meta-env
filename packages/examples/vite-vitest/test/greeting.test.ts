import { test, expect } from "vitest";
import { greeting } from "../src/greeting";

test("greeting", () => {
  expect(greeting).toBe("Hello vite-plugin-dotenv!");
});
