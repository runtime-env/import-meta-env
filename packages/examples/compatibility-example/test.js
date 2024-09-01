const colors = require("picocolors");

(async () => {
  console.log("test dotenv@12...");
  await require("./test.dotenv@12.js")();

  console.log("test dotenv@15...");
  await require("./test.dotenv@15.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
