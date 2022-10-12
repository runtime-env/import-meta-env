const colors = require("picocolors");

(async () => {
  console.log("test mocha...");
  await require("./test.mocha.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
