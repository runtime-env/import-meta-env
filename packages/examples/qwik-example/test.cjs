const colors = require("picocolors");

(async () => {
  console.log("test dev...");
  await require("./test.dev.cjs")();

  console.log("test prod...");
  await require("./test.prod.cjs")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
