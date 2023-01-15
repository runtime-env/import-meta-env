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
import { replaceAllAsIsPlaceholderWithEnv } from "./replace-all-as-is-placeholder-with-env";

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
  resolveOutputFileNames(path).forEach((outputFileName) => {
    if (lstatSync(outputFileName).isDirectory()) return;
    if (isSourceMap(outputFileName)) return;
    if (isBackupFileName(outputFileName)) return;

    const backupFileName = outputFileName + backupFileExt;
    if (!opts.disposable) tryToRestore(backupFileName);

    let code = readFileSync(outputFileName, "utf8");

    if (shouldInjectEnv(code) === false) return;
    if (!opts.disposable) copyFileSync(outputFileName, backupFileName);

    code = replaceAllPlaceholderWithEnv({ code, env });
    code = replaceAllAsIsPlaceholderWithEnv({ code, env });
    writeFileSync(outputFileName, code);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
