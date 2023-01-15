import serialize from "serialize-javascript";

export const replaceAllAsIsPlaceholderWithEnv = ({
  code,
  env,
}: {
  code: string;
  env: Record<string, string>;
}): string => {
  Object.keys(env).forEach((key) => {
    code = code.replace(
      `import_meta_env_${key}`,
      serialize(env[key]).slice(1, -1)
    );
  });
  return code;
};
