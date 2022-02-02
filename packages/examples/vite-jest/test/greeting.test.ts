import { greeting } from "../src/greeting";

jest.mock(
  "env",
  () => ({
    VITE_NAME: "vite-plugin-dotenv",
  }),
  { virtual: true }
);

test("greeting", () => {
  expect(greeting).toBe("Hello vite-plugin-dotenv!");
});
