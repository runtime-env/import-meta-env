import { hello } from "../src/hello";

test("hello", () => {
  expect(hello).toBe("import-meta-env");
});
