import { Command } from "commander";
import { existsSync } from "fs";
import colors from "picocolors";
import { version } from "../package.json";

const defaultOutDir = ".";

export interface Args {
  example: string;
  outDir?: string;
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description("Generate import-meta-env.d.ts from .env.example")
    .requiredOption(
      "-x, --example <path>",
      "The .env example file path to load"
    )
    .option(
      "-o, --outDir <path>",
      `Specify an output folder for emitted file. (default: ${JSON.stringify(
        defaultOutDir
      )})`
    )
    .action((args: Args) => {
      if (existsSync(args.example) === false) {
        console.error(
          colors.red(
            `[@import-meta-env/typescript]: Example file not found: ${args.example}`
          )
        );
        if (require.main === module) process.exit(1);
      }
    });
