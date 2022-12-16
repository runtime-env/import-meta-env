const colors = require("picocolors");

(async () => {
  console.log("test component...");
  await require("./test.component.cjs")();

  console.log("test e2e...");
  await require("./test.e2e.cjs")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
