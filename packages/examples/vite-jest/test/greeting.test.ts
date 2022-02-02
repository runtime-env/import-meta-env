import { greeting } from "../src/greeting";

test("greeting", () => {
  expect(greeting).toBe("Hello vite-plugin-dotenv!");
});
