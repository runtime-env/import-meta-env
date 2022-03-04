import { copyFileSync, lstatSync, readFileSync, writeFileSync } from "fs";
import { resolveEnv } from "../../shared";
import { isBackupFileName } from "./is-backup-file-name";
import { tryToRestore } from "./try-to-restore";
import { isSourceMap } from "./is-source-map";
import { Args, createCommand } from "./create-command";
import { backupFileExt, defaultOutput, placeholderVariants } from "./shared";
import { resolveOutputFileNames } from "./resolve-output-file-names";
import { replaceAllPlaceholderWithEnv } from "./replace-all-placeholder-with-env";

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

  const output = opts.output ?? defaultOutput;
  resolveOutputFileNames(output).forEach((outputFileName) => {
    if (lstatSync(outputFileName).isFile() === false) return;

    if (isSourceMap(outputFileName)) return;
    if (isBackupFileName(outputFileName)) return;

    const backupFileName = outputFileName + backupFileExt;
    tryToRestore(backupFileName);

    const code = readFileSync(outputFileName, "utf8");

    if (placeholderVariants.some((p) => code.includes(p)) === false) return;
    if (!opts.disposable) copyFileSync(outputFileName, backupFileName);

    const outputCode = replaceAllPlaceholderWithEnv(code, env);
    writeFileSync(outputFileName, outputCode);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
