import { resolveEnvExample } from "../../../shared/resolve-env-example";
import { ViteResolvedConfig } from "./types";

const DEFAULT_PREFIX_KEY = "VITE_";

export const warnEnvPrefix = ({
  envExampleFilePath,
  viteConfigEnvPrefix,
  warn,
}: {
  envExampleFilePath: string;
  viteConfigEnvPrefix?: ViteResolvedConfig["envPrefix"];
  warn: (message: any) => void;
}) => {
  const example = resolveEnvExample({ envExampleFilePath });
  const prefixKeys = [
    ...new Set(
      typeof viteConfigEnvPrefix === "undefined"
        ? [DEFAULT_PREFIX_KEY]
        : typeof viteConfigEnvPrefix === "string"
        ? [viteConfigEnvPrefix]
        : viteConfigEnvPrefix
    ),
  ];

  const messages = new Set();
  example.forEach((key) => {
    prefixKeys.forEach((prefixKey) => {
      if (key.startsWith(prefixKey)) {
        messages.add(
          `[import-meta-env]: During production, \`import.meta.env.${key}\` will be statically replaced.`
        );
      }
    });
  });

  if (messages.size) {
    messages.forEach((message) => warn(message));
    warn(
      `If you want to replace env variables after production, you need to use a key other than \`[${prefixKeys
        .map((key) => JSON.stringify(key))
        .join(", ")}]\`.`
    );
  }
};
