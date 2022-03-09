var { hello } = require("../src/hello");
var expect = require("expect");

describe("hello", () => {
  expect(hello).toBe("import-meta-env");
});
