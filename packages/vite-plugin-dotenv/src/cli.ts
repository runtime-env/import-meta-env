import { Command } from "commander";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { config } from "dotenv";
import colors from "picocolors";
import { placeholder, virtualFile } from "./index";
import glob from "glob";
import { version } from "../package.json";

const backupFileExt = ".bak";
const outputGlobPaths = [`dist/**/${virtualFile}*`];
const generateDefaultOutput = () => {
  const outputFilePaths = outputGlobPaths
    .map((globPath) => glob.sync(globPath))
    .flat();

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
    .description(
      "Inject your environment variables from the `.env` file or from environment variables on your machine."
    )
    .option("-e, --env <path>", ".env file path", ".env")
    .option("-x, --example <path>", ".env example file path", ".env.example")
    .option("-o, --output <path...>", "output file paths")
    .action((args: Args) => {
      if (existsSync(args.example) === false) {
        console.error(
          colors.red(
            `[vite-plugin-dotenv]: Example file not found: ${args.example}`
          )
        );
        if (require.main === module) process.exit(1);
      }

      const outputFilePaths = args.output ?? generateDefaultOutput();
      if (outputFilePaths.length === 0) {
        console.error(
          colors.red(`[vite-plugin-dotenv]: Output file not found`)
        );
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
            `[vite-plugin-dotenv]: Output file not found: ${notFoundOutputFilePaths.join(
              ", "
            )}`
          )
        );
        if (require.main === module) process.exit(1);
      }
    });

export const resolve = ({
  envFilePath,
  envExampleFilePath,
}: {
  envFilePath: string;
  envExampleFilePath: string;
}): Record<string, string> => {
  const parsed = (() => {
    const { parsed, error } = config({ path: envFilePath });

    if (error === undefined) {
      return Object.assign({}, parsed!, process.env);
    }

    return { ...process.env };
  })();

  const parsedExample = (() => {
    const { parsed, error } = config({ path: envExampleFilePath });

    if (error === undefined) {
      return parsed!;
    }

    return {};
  })();

  const missingKeys: string[] = [];
  const env = Object.keys(parsedExample).reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(parsed, key) === false) {
      missingKeys.push(key);
    }

    return Object.assign(acc, { [key]: parsed[key] });
  }, {});
  if (missingKeys.length) {
    throw new Error(
      `[vite-plugin-dotenv]: The following variables were defined in .env.example but are not present in the environment: ` +
        missingKeys.join(", ")
    );
  }

  return env!;
};

export const main = (di: {
  command: ReturnType<typeof createCommand>;
  resolve: typeof resolve;
}) => {
  di.command.parse();
  const opts: Args = di.command.opts();

  const env = di.resolve({
    envExampleFilePath: opts.example,
    envFilePath: opts.env,
  });
  (opts.output ?? generateDefaultOutput()).forEach((outputFileName) => {
    const backupFileName = outputFileName + backupFileExt;
    if (
      outputFileName.endsWith(backupFileExt) === false &&
      existsSync(backupFileName)
    ) {
      copyFileSync(backupFileName, outputFileName);
    }
    if (outputFileName.endsWith(backupFileExt)) return;

    copyFileSync(outputFileName, backupFileName);

    const code = readFileSync(outputFileName, "utf8");
    const outputCode = code.replace(placeholder, JSON.stringify(env));
    writeFileSync(outputFileName, outputCode);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolve });
}
