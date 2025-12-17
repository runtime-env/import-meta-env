import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import serialize from "serialize-javascript";
import { DEFAULT_ACCESSOR_KEY } from "../../shared/constant";

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
  const content = `globalThis.${accessorKey} = ${serialize(env)};
`;

  writeFileSync(filePath, content, "utf8");
};
