const childProcess = require("child_process");
const getPort = require("../get-port");

module.exports = async () => {
  const port = await getPort();
  const hello = Math.random();

  const commands = [
    "npx rimraf dist node_modules/.vite",
    "npm add ../../unplugin/import-meta-env-unplugin-test.tgz",
  ];
  commands.forEach((command) =>
    childProcess.execSync(command, { stdio: "inherit" }),
  );

  const childProcessList = [];
  const cleanExit = () => {
    childProcessList.forEach((child) => {
      child.kill();
    });
  };
  process.on("exit", cleanExit);
  const longRunningCommands = [
    `cross-env HELLO=${hello} npx vite dev --port ${port}`,
  ];
  longRunningCommands.forEach((command) =>
    childProcessList.push(
      childProcess.exec(command, (error, stdout, stderr) => {
        if (error) throw error;
        console.log(stdout);
        console.error(stderr);
      }),
    ),
  );

  childProcess.execSync(
    `cross-env PORT=${port} cypress run --e2e --env HELLO=${hello}`,
    { stdio: "inherit" },
  );
};
