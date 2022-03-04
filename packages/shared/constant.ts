export const virtualFile = "import-meta-env";

export const placeholder = "'__import_meta_env_placeholder__'";

export const uniqueVariableName = (() => {
  const uniqueVariableName = "import_meta_env_unique_id_";
  return (
    uniqueVariableName +
    Array(256 - uniqueVariableName.length)
      .fill("x")
      .join("")
  );
})();

export const envFilePath = ".env";
