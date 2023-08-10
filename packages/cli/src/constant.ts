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
    "g",
  );

const prependSlash = ({ char, count }: { char: string; count: number }) => {
  return "\\".repeat(count * 2) + char;
};
