export const virtualFile = "import-meta-env";

export const scriptPlaceholder = '<script id="import-meta-env"></script>';

export const createScriptPlaceholderRegExp = () =>
  new RegExp(`<script id="import-meta-env"></script>`, "g");

// 1. Accessor cannot contain `eval` as it would violate CSP.
// 2. Accessor need to fallback to empty object, since during prerender there is no environment variables in globalThis.
export const accessor = `Object.create(globalThis.import_meta_env || null)`;

export const createAccessorRegExp = (
  suffix: string,
  quote: "single" | "double" = "double"
) =>
  new RegExp(
    "\\b" +
      accessor
        .replace(/([\(\)\[\]\|])/g, "\\$1")
        .replace(/\s/g, "\\s*")
        .replace(/"/g, quote === "double" ? '"' : "'") +
      suffix,
    "g"
  );

export const envFilePath = ".env";
