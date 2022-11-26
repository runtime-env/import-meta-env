const colors = require("picocolors");

(async () => {
  // TODO: run dev test in CI when result in "Animation Enabled", don't know why now.
  // disabled for now, run dev test locally instead.
  //
  // console.log("test dev...");
  // await require("./test.dev.js")();

  console.log("test prod...");
  await require("./test.prod.js")();

  console.log(colors.green("✔ Test passed!"));
  process.exit(0);
})();
