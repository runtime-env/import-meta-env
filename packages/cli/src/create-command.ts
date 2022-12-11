import { Command } from "commander";
import { resolveEnvExampleKeys } from "../../shared/resolve-env-example-keys";
import colors from "picocolors";
import { version } from "../package.json";
import { resolveOutputFileNames } from "./resolve-output-file-names";
import { defaultOutput } from "./shared";

export interface Args {
  env: string;
  example: string;
  output: string[];
  disposable: boolean;
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description(
      "Populates your environment variables from the system or `.env` file."
    )
    .option(
      "-e, --env <path>",
      "The .env file path to load. You can out-out this by passing an empty string.",
      ".env"
    )
    .requiredOption(
      "-x, --example <path>",
      "The .env example file path to load"
    )
    .option(
      "-o, --output <path...>",
      `The output file/dir paths to inject in-place (default: ${JSON.stringify(
        defaultOutput
      )})`
    )
    .option(
      "--disposable",
      "Do not create backup files and restore from backup files. In local development, disable this option to avoid rebuilding the project when environment variable changes, In production, enable this option to avoid generating unnecessary backup files."
    )
    .action((args: Args) => {
      resolveEnvExampleKeys({
        envExampleFilePath: args.example,
      });

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
