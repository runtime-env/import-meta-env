import { all, hello } from "../src/hello";

test("hello", () => {
  expect(hello).toEqual("final-env");
});

test("all", () => {
  expect(all).toEqual({ HELLO: "final-env" });
});
