import { copyFileSync, lstatSync, readFileSync, writeFileSync } from "fs";
import { resolveEnv, placeholder } from "../../shared";
import { isBackupFileName } from "./is-backup-file-name";
import { tryToRestore } from "./try-to-restore";
import { isSourceMap } from "./is-source-map";
import { Args, createCommand } from "./create-command";
import { backupFileExt, defaultOutput } from "./shared";
import { resolveOutputFileNames } from "./resolve-output-file-names";

const placeholderVariants = ['"', "'"].map((q) =>
  placeholder.replace(new RegExp("'", "g"), q)
);

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
    copyFileSync(outputFileName, backupFileName);

    let outputCode = code;
    placeholderVariants.forEach((p) => {
      outputCode = outputCode.replace(new RegExp(p, "g"), JSON.stringify(env));
    });
    writeFileSync(outputFileName, outputCode);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
