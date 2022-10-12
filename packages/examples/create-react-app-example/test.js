const colors = require("picocolors");

(async () => {
  console.log("test dev...");
  await require("./test.dev.js")();

  console.log("test prod...");
  await require("./test.prod.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
