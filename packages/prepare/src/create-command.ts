import { Command } from "commander";
import { version } from "../package.json";

export interface Args {
  env: string;
  example: string;
  path: string[];
  userEnvironment: boolean;
}

export const createCommand = () =>
  new Command()
    .version(version)
    .description("Generate `.env` file from `.env.*` files.")
    .option("-e, --env <path>", ".env file path to write", ".env")
    .requiredOption("-x, --example <path>", ".env.example file path to read")
    .option("-p, --path <path...>", `.env.* file paths to read`, [
      ".env.local.defaults",
      ".env.local",
    ])
    .option(
      "-u, --user-environment",
      "whether to load user environment variables (i.e., process.env.*)",
      false,
    );
