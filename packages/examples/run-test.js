const puppeteer = require("puppeteer");
const childProcess = require("child_process");
const { expect } = require("chai");
const colors = require("picocolors");

module.exports = ({
  commands,
  longRunningCommands,
  expected,
  url,
  waitMs,
  waitUntil,
  waitForSelector,
  noExit,
}) => {
  const childProcessList = [];
  const cleanExit = () => {
    childProcessList.forEach((child) => {
      child.kill();
    });
  };
  process.on("exit", cleanExit);

  commands.forEach((command) =>
    childProcess.execSync(command, { stdio: "inherit" }),
  );
  longRunningCommands.forEach((command) =>
    childProcessList.push(
      childProcess.exec(command, (error, stdout, stderr) => {
        if (error) throw error;
        console.log(stdout);
        console.error(stderr);
      }),
    ),
  );

  return (async () => {
    await new Promise((resolve) => setTimeout(resolve, waitMs));

    // arrange
    const browser = await puppeteer.launch({
      args: process.env.CI ? ["--no-sandbox"] : [],
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: waitUntil || "networkidle0",
    });
    waitForSelector && (await page.waitForSelector(waitForSelector));

    // act
    const result = await (
      await page.$("html")
    ).evaluate(() => document.body.innerText);

    // assert
    expect(result).to.equal(expected);

    // cleanup
    await browser.close();

    if (!noExit) {
      console.log(colors.green("✔ Test passed!"));
      process.exit(0);
    }
  })();
};
