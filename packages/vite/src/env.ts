import { config } from "dotenv";

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
      `[import-meta-env]: The following variables were defined in .env.example but are not present in the environment: ` +
        missingKeys.join(", ")
    );
  }

  return env!;
};
