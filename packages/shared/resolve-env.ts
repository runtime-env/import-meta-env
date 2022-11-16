// @ts-ignore: the dotenv package will be installed in each project
import { config } from "dotenv";
import { red, yellow } from "picocolors";

export const resolveEnv = ({
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

    console.warn(
      yellow(
        `[import-meta-env]: ${envExampleFilePath} file not found, skip process.\n`
      )
    );

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
    const missingEnv = missingKeys.map((key) => `${key}=${parsedExample[key]}`);

    const environmentVariablesAreMissing = [
      "",
      `The following variables were defined in ${envExampleFilePath} file but are not defined in the environment:`,
      "",
      "```",
      ...missingEnv,
      "```",
      "",
      `Here's what you can do:`,
      `- Set them to environment variables on your system.`,
      `- Add them to ${envFilePath} file.`,
      `- Remove them from ${envExampleFilePath} file.`,
      "",
    ].join("\n");
    console.error(
      red(`[import-meta-env]: Some environment variables are not defined.`)
    );
    console.error(environmentVariablesAreMissing);

    throw ReferenceError(`Some environment variables are not defined.`);
  }

  return Object.freeze(env!);
};
