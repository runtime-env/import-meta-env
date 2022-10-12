const colors = require("picocolors");

(async () => {
  console.log("test jest...");
  await require("./test.jest.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
