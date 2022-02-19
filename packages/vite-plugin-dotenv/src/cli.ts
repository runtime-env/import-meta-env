import { Command } from "commander";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { config } from "dotenv";
import { defaultPlaceholder, virtualFile } from "./index";
import glob from "glob";

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
  placeholder: string;
  output: string[];
}

export const command = new Command()
  .description(
    "Inject your environment variables from the .env file or system environment variables."
  )
  .option("-e, --env <path>", ".env file path", ".env")
  .option(
    "--example <path>",
    ".env example file path, required if key is not specified",
    ".env.example"
  )
  .option("-o, --output <path...>", "output file paths")
  .option(
    "-p, --placeholder <placeholder>",
    "placeholder to be injected",
    defaultPlaceholder
  );

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
  command: typeof command;
  resolve: typeof resolve;
}) => {
  di.command.parse();
  const opts: Args = di.command.opts();

  const env = di.resolve({
    envExampleFilePath: opts.example,
    envFilePath: opts.env,
  });
  const placeholder = opts.placeholder;
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
  main({ command, resolve });
}
