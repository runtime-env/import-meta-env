import { placeholder } from "../../../shared";

test("placeholders should use eval as it is blocked by content security policy", () => {
  expect(placeholder).not.toContain("eval");
});

test("placeholders should contain quotes", () => {
  expect(placeholder).toContain(`"`);
});
