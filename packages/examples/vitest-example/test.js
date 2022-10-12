const colors = require("picocolors");

(async () => {
  console.log("test vitest...");
  await require("./test.vitest.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
