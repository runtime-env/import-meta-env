import { Command } from "commander";
import { resolveEnvExampleKeys } from "../../shared/resolve-env-example-keys";
import colors from "picocolors";
import { version } from "../package.json";
import { resolveOutputFileNames } from "./resolve-output-file-names";
import { defaultOutput } from "./shared";
import { DEFAULT_ACCESSOR_KEY } from "../../shared/constant";

export interface Args {
  env: string;
  example: string;
  path: string[];
  disposable: boolean;
  generate?: string;
  prepend?: string;
  accessorKey: string;
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description(
      "Populates your environment variables from the system or `.env` file.",
    )
    .option(
      "-e, --env <path>",
      "The .env file path to load. You can out-out this by passing an empty string.",
      ".env",
    )
    .requiredOption(
      "-x, --example <path>",
      "The .env example file path to load",
    )
    // TODO: remove this option in v1
    .option(
      "-o, --output <path...>",
      `[deprecated: use --path] The file/dir paths to inject in-place (default: ${JSON.stringify(
        defaultOutput,
      )})`,
    )
    .option(
      "-p, --path <path...>",
      `The file/dir paths to inject in-place (default: ${JSON.stringify(
        defaultOutput,
      )})`,
    )
    .option(
      "--disposable",
      "Do not create backup files and restore from backup files. In local development, disable this option to avoid rebuilding the project when environment variable changes, In production, enable this option to avoid generating unnecessary backup files.",
    )
    .option(
      "-g, --generate <filepath>",
      "Generate a standalone JavaScript file containing environment variables instead of replacing placeholders in existing files.",
    )
    .option(
      "--prepend <filepath>",
      "Prepend environment variables to an existing JavaScript file (e.g., remoteEntry.js). The globalThis.<key> assignment will be inserted at the beginning of the file.",
    )
    .option(
      "-k, --accessor-key <key>",
      "The global variable key used to access environment variables (e.g., globalThis.<key>).",
      DEFAULT_ACCESSOR_KEY,
    )
    .action((args: Args) => {
      args = { ...args };

      if ((args as Args & { output: string[] }).output) {
        console.warn(
          colors.yellow(
            `[import-meta-env]: Option \`-o, --output\` were deprecated and will be removed in a future release, please use \`-p, --path\` instead.`,
          ),
        );
      }
      args.path = args.path ?? (args as Args & { output: string[] }).output;

      resolveEnvExampleKeys({
        envExampleFilePath: args.example,
      });

      // Skip output file validation for --generate and --prepend modes
      if (args.generate || args.prepend) {
        return;
      }

      const path = args.path ?? defaultOutput;
      const foundOutputFilePaths = resolveOutputFileNames(path);
      if (foundOutputFilePaths.length === 0) {
        console.error(
          colors.red(
            `[import-meta-env]: Output file not found: ${path.join(", ")}`,
          ),
        );
        if (require.main === module) process.exit(1);
      }
    });
