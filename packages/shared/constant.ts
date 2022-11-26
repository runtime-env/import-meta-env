export const virtualFile = "import-meta-env";

export const scriptPlaceholder = `JSON.parse('"import_meta_env_placeholder"')`;

export const createScriptPlaceholderRegExp = ({
  doubleQuoteSlashCount: doubleQuoteSlashCount,
  singleQuoteSlashCount: singleQuoteSlashCount,
}: {
  doubleQuoteSlashCount: 0 | 1 | 2;
  singleQuoteSlashCount: 0 | 1;
}) =>
  new RegExp(
    scriptPlaceholder
      .replace(/([\(\)])/g, "\\$1")
      .replace(/"/g, prependSlash({ char: '"', count: doubleQuoteSlashCount }))
      .replace(/'/g, prependSlash({ char: "'", count: singleQuoteSlashCount })),
    "g"
  );

const prependSlash = ({ char, count }: { char: string; count: number }) => {
  return "\\".repeat(count * 2) + char;
};

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
