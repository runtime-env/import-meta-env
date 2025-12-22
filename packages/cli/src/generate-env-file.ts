import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { dirname } from "path";
import serialize from "serialize-javascript";
import { DEFAULT_ACCESSOR_KEY } from "../../shared/constant";

const generateEnvContent = (
  env: Record<string, string>,
  accessorKey: string,
): string => {
  return `globalThis.${accessorKey} = ${serialize(env)};
`;
};

export const generateEnvFile = ({
  filePath,
  env,
  accessorKey = DEFAULT_ACCESSOR_KEY,
}: {
  filePath: string;
  env: Record<string, string>;
  accessorKey?: string;
}): void => {
  // Ensure directory exists
  const dir = dirname(filePath);
  mkdirSync(dir, { recursive: true });

  // Generate the JS content
  const content = generateEnvContent(env, accessorKey);

  writeFileSync(filePath, content, "utf8");
};

export const prependEnvToFile = ({
  filePath,
  env,
  accessorKey = DEFAULT_ACCESSOR_KEY,
}: {
  filePath: string;
  env: Record<string, string>;
  accessorKey?: string;
}): void => {
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Read existing file content
  const existingContent = readFileSync(filePath, "utf8");

  // Generate the env content to prepend
  const envContent = generateEnvContent(env, accessorKey);

  // Prepend env content to existing file
  const newContent = envContent + existingContent;

  writeFileSync(filePath, newContent, "utf8");
};
