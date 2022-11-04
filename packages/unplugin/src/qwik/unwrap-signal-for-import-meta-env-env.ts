export function unwrapSignalForImportMetaEnvEnv({
  code,
  example,
}: {
  code: string;
  example: readonly string[];
}) {
  example.forEach((key) => {
    code = code.replace(
      new RegExp(`_wrapSignal\\(import\\.meta\\.env, "(${key})"\\)`, "g"),
      "import.meta.env.$1"
    );
  });
  return code;
}
