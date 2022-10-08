import { config as dotenvConfig } from "dotenv";

export const parseExample = ({
  envExampleFilePath,
}: {
  envExampleFilePath: string;
}) => {
  const { parsed, error } = dotenvConfig({ path: envExampleFilePath });
  if (error) {
    return {};
  }
  return parsed!;
};
