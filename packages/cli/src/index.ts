import { copyFileSync, lstatSync, readFileSync, writeFileSync } from "fs";
import { resolveEnv } from "../../shared";
import { isBackupFileName } from "./is-backup-file-name";
import { tryToRestore } from "./try-to-restore";
import { isSourceMap } from "./is-source-map";
import { Args, createCommand } from "./create-command";
import { backupFileExt, defaultOutput } from "./shared";
import { resolveOutputFileNames } from "./resolve-output-file-names";
import { replaceAllPlaceholderWithEnv } from "./replace-all-placeholder-with-env";
import { shouldInjectEnv } from "./should-inject-env";
import colors from "picocolors";

export const main = (di: {
  command: ReturnType<typeof createCommand>;
  resolveEnv: typeof resolveEnv;
}) => {
  di.command.parse();
  const opts: Args = di.command.opts();

  const env = di.resolveEnv({
    envExampleFilePath: opts.example,
    envFilePath: opts.env,
  });

  const path = opts.path ?? defaultOutput;
  let hasReplaced = false;
  resolveOutputFileNames(path).forEach((outputFileName) => {
    if (lstatSync(outputFileName).isDirectory()) return;
    if (isSourceMap(outputFileName)) return;
    if (isBackupFileName(outputFileName)) return;

    const backupFileName = outputFileName + backupFileExt;
    if (!opts.disposable) tryToRestore(backupFileName);

    const code = readFileSync(outputFileName, "utf8");

    if (shouldInjectEnv(code) === false) return;
    if (!opts.disposable) copyFileSync(outputFileName, backupFileName);

    const outputCode = replaceAllPlaceholderWithEnv({ code, env });
    if (code === outputCode) return;

    hasReplaced = true;
    writeFileSync(outputFileName, outputCode);
  });

  if (hasReplaced) return;

  console.error(
    [
      colors.red(`[import-meta-env]: Placeholder not found`),
      "",
      colors.yellow(
        `It looks like you forgot to add the special expression to your entry.`,
      ),
      colors.yellow(
        `See special expression for more info: https://runtime-env.github.io/import-meta-env/guide/getting-started/introduction.html#special-expression`,
      ),
    ].join("\n"),
  );
  if (require.main === module) process.exit(1);
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
