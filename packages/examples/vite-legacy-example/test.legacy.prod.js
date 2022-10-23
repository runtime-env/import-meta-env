const { readFileSync, writeFileSync } = require("fs");
const runTest = require("../run-test");
const getPort = require("../get-port");

module.exports = async () => {
  await require("./test.prod.js")();

  const port = await getPort();
  const hello = Math.random();

  writeFileSync(
    "dist/index.html",
    readFileSync("dist/index.html", "utf8")
      .replace(
        '<script type="module" crossorigin src="/assets/index.js"></script>',
        ""
      )
      .replace("<script nomodule", "<script ")
      .replace("<script nomodule", "<script ")
      .replace("<script nomodule", "<script ")
  );
  const commands = [
    `npx cross-env HELLO=${hello} npx import-meta-env -x .env.example.public`,
  ];
  const longRunningCommands = [`npx vite preview --port ${port}`];
  const expected = `Hello: ${hello}\nIs legacy? true`;
  const url = `http://localhost:${port}`;
  const waitMs = 1000;

  await runTest({
    commands,
    longRunningCommands,
    expected,
    url,
    waitMs,
    noExit: true,
  });
};
