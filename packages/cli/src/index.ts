import { Command } from "commander";
import {
  copyFileSync,
  existsSync,
  lstatSync,
  readFileSync,
  writeFileSync,
} from "fs";
import colors from "picocolors";
import { resolveEnv, placeholder } from "../../shared";
import glob from "glob";
import { version } from "../package.json";
import { isBackupFileName } from "./is-backup-file-name";
import { tryToRestore } from "./try-to-restore";
import { isSourceMap } from "./is-source-map";

const backupFileExt = ".bak";
const defaultOutput = [
  "dist/**/*",
  ".next/**/*",
  ".nuxt/**/*",
  ".output/**/*",
  "build/**/*",
];

const resolveOutputFileNames = (outputPaths: string[]) => {
  return outputPaths
    .map((path) => glob.sync(path))
    .flat()
    .filter((path) => existsSync(path))
    .filter((path) => lstatSync(path).isFile());
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
      `The output file/dir paths to inject in-place (default: ${JSON.stringify(
        defaultOutput
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

      const output = args.output ?? defaultOutput;
      const foundOutputFilePaths = resolveOutputFileNames(output);
      if (foundOutputFilePaths.length === 0) {
        console.error(
          colors.red(
            `[import-meta-env]: Output file not found: ${output.join(", ")}`
          )
        );
        if (require.main === module) process.exit(1);
      }
    });

const placeholderVariants = ['"', "'"].map((q) =>
  placeholder.replace(new RegExp("'", "g"), q)
);

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

  const output = opts.output ?? defaultOutput;
  resolveOutputFileNames(output).forEach((outputFileName) => {
    if (lstatSync(outputFileName).isFile() === false) return;

    if (isSourceMap(outputFileName)) return;
    if (isBackupFileName(outputFileName)) return;

    const backupFileName = outputFileName + backupFileExt;
    tryToRestore(backupFileName);

    const code = readFileSync(outputFileName, "utf8");

    if (placeholderVariants.some((p) => code.includes(p)) === false) return;
    copyFileSync(outputFileName, backupFileName);

    let outputCode = code;
    placeholderVariants.forEach((p) => {
      outputCode = outputCode.replace(new RegExp(p, "g"), JSON.stringify(env));
    });
    writeFileSync(outputFileName, outputCode);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
