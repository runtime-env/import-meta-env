import { Command } from "commander";
import {
  copyFileSync,
  existsSync,
  lstatSync,
  readFileSync,
  writeFileSync,
} from "fs";
import colors from "picocolors";
import { resolveEnv, placeholder, virtualFile } from "../../shared";
import glob from "glob";
import { version } from "../package.json";

const backupFileExt = ".bak";
const virtualFileGlob = `dist/assets/${virtualFile}*`;
const generateDefaultOutput = () => {
  const outputFilePaths = glob
    .sync(virtualFileGlob)
    .filter((path) => path.includes("node_modules") === false);

  return outputFilePaths;
};

export interface Args {
  env: string;
  example: string;
  output: string[];
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description("Inject environment variables from the system or `.env` file.")
    .option("-e, --env <path>", "The .env file path to load", ".env")
    .option(
      "-x, --example <path>",
      "The .env example file path to load",
      ".env.example"
    )
    .option(
      "-o, --output <path...>",
      `The output file paths to inject in-place (default: ${JSON.stringify(
        virtualFileGlob
      )})`
    )
    .action((args: Args) => {
      if (existsSync(args.example) === false) {
        console.error(
          colors.red(
            `[import-meta-env]: Example file not found: ${args.example}`
          )
        );
        if (require.main === module) process.exit(1);
      }

      const outputFilePaths = args.output ?? generateDefaultOutput();
      if (outputFilePaths.length === 0) {
        console.error(colors.red(`[import-meta-env]: Output file not found`));
        if (require.main === module) process.exit(1);
      }

      const notFoundOutputFilePaths = outputFilePaths.filter(
        (outputFilePath) => {
          return existsSync(outputFilePath) === false;
        }
      );
      if (notFoundOutputFilePaths.length > 0) {
        console.error(
          colors.red(
            `[import-meta-env]: Output file not found: ${notFoundOutputFilePaths.join(
              ", "
            )}`
          )
        );
        if (require.main === module) process.exit(1);
      }
    });

export const main = (di: {
  command: ReturnType<typeof createCommand>;
  resolveEnv: typeof resolveEnv;
}) => {
  di.command.parse();
  const opts: Args = di.command.opts();

  const env = di.resolveEnv({
    envExampleFilePath: opts.example,
    envFilePath: opts.env,
  });
  (opts.output ?? generateDefaultOutput()).forEach((outputFileName) => {
    if (lstatSync(outputFileName).isFile() === false) return;

    const backupFileName = outputFileName + backupFileExt;
    if (
      outputFileName.endsWith(backupFileExt) === false &&
      existsSync(backupFileName)
    ) {
      copyFileSync(backupFileName, outputFileName);
    }
    if (outputFileName.endsWith(backupFileExt)) return;

    const code = readFileSync(outputFileName, "utf8");
    if (code.includes(placeholder) === false) return;
    copyFileSync(outputFileName, backupFileName);

    const outputCode = code.replace(placeholder, JSON.stringify(env));
    writeFileSync(outputFileName, outputCode);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
