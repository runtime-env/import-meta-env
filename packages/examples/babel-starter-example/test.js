const colors = require("picocolors");

(async () => {
  console.log("test dev...");
  await require("./test.dev.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
