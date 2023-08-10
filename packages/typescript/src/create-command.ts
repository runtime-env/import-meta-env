import { Command } from "commander";
import { version } from "../package.json";

const defaultOutDir = ".";

export interface Args {
  example: string;
  outDir?: string;
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description("Generate declaration file from .env.example")
    .requiredOption(
      "-x, --example <path>",
      "The .env example file path to load",
    )
    .option(
      "-o, --outDir <path>",
      `Specify an output folder for emitted file. (default: ${JSON.stringify(
        defaultOutDir,
      )})`,
    );
