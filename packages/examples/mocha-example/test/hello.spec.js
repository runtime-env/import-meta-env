var { all, hello } = require("../src/hello");
var expect = require("expect");

describe("hello", () => {
  expect(hello).toEqual("final-env");
});

describe("all", () => {
  expect(all).toEqual({ HELLO: "final-env" });
});
