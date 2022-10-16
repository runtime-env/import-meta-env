export const virtualFile = "import-meta-env";

// 1. Placeholders cannot be literal string (e.g., `import_meta_env`), because some minifier will remove it.
// 2. Placeholders cannot be `eval("import_meta_env")`, because prerenderer will result in SyntaxError.
// 3. Placeholders cannot contain `eval` as it would violate CSP.
// 4. Placeholders need to contain quotes so that the CLI knows which quotes (i.e. `'` or `"`) to use to avoid SyntaxError.
export const placeholder = `Object.create(globalThis["import_meta_env".slice()] || null)`;

export const createPlaceholderRegExp = (suffix: string) =>
  new RegExp(placeholder.replace(/([\(\)\[\]\|])/g, "\\$1") + suffix, "g");

export const envFilePath = ".env";
