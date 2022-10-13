export const virtualFile = "import-meta-env";

// 1. Placeholder cannot be literal string (e.g., `import_meta_env`), because some minifier will remove it.
// 2. Placeholder cannot be `eval("import_meta_env")`, because prerenderer will result in SyntaxError.
export const placeholder = `eval("var import_meta_env={};import_meta_env")`;

export const createPlaceholderRegExp = (suffix: string) =>
  new RegExp(
    placeholder.replace(/\(/g, "\\(").replace(/\)/g, "\\)") + suffix,
    "g"
  );

export const envFilePath = ".env";
