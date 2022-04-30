import { Command } from "commander";
import { existsSync } from "fs";
import colors from "picocolors";
import { version } from "../package.json";
import { collectFilePathsFromGlobs } from "./collect-file-paths-from-globs";
import { defaultFileGlobs } from "./shared";

export interface Args {
  env: string;
  example: string;
  disposable: boolean;
  compression: string;
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description(
      "Populates your environment variables from the system or `.env` file."
    )
    .argument("[file...]", `The file glob to inject in-place`, defaultFileGlobs)
    .option("-e, --env <path>", "The .env file path to load", ".env")
    .requiredOption(
      "-x, --example <path>",
      "The .env example file path to load"
    )
    .option(
      "--disposable",
      "Do not create backup files and restore from backup files. In local development, disable this option to avoid rebuilding the project when environment variable changes, In production, enable this option to avoid generating unnecessary backup files."
    )
    .option(
      "--compression <path>",
      `A file path which should expose two functions: \`compressSync\` and \`decompressSync\`. Please refer to the \`CompressionModule\` interface (https://github.com/iendeavor/import-meta-env/blob/main/packages/cli/src/compression-module.ts) for more details.`
    )
    .action((fileGlobs: string[], args: Args) => {
      if (existsSync(args.example) === false) {
        console.error(
          colors.red(
            `[import-meta-env]: Example file not found: ${args.example}`
          )
        );
        if (require.main === module) process.exit(1);
      }

      const foundFilePaths = collectFilePathsFromGlobs(fileGlobs);
      if (foundFilePaths.length === 0) {
        console.error(
          colors.red(
            `[import-meta-env]: File not found: ${fileGlobs.join(", ")}`
          )
        );
        if (require.main === module) process.exit(1);
      }

      if (
        args.compression !== undefined &&
        existsSync(args.compression) === false
      ) {
        console.error(
          colors.red(
            `[import-meta-env]: Compression module file not found: ${args.compression}`
          )
        );
        if (require.main === module) process.exit(1);
      }
    });
