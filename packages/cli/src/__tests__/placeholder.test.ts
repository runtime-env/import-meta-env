import { accessor } from "../../../shared";

test("placeholders should use eval as it is blocked by content security policy", () => {
  expect(accessor).not.toContain("eval");
});
