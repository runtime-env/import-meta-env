import { copyFileSync, lstatSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { resolveEnv } from "../../shared";
import { isBackupFileName } from "./is-backup-file-name";
import { tryToRestore } from "./try-to-restore";
import { isSourceMap } from "./is-source-map";
import { Args, createCommand } from "./create-command";
import { backupFileExt } from "./shared";
import { collectFilePathsFromGlobs } from "./collect-file-paths-from-globs";
import { replaceAllPlaceholderWithEnv } from "./replace-all-placeholder-with-env";
import { shouldInjectEnv } from "./should-inject-env";
import { CompressionModule } from "./compression-module";

export const main = (di: {
  command: ReturnType<typeof createCommand>;
  resolveEnv: typeof resolveEnv;
}) => {
  di.command.parse();
  const opts: Args = di.command.opts();
  const [fileGlobs] = di.command.processedArgs as [string[]];

  const env = di.resolveEnv({
    envExampleFilePath: opts.example,
    envFilePath: opts.env,
  });

  collectFilePathsFromGlobs(fileGlobs).forEach((filePath) => {
    if (lstatSync(filePath).isDirectory()) return;
    if (isSourceMap(filePath)) return;
    if (isBackupFileName(filePath)) return;

    const backupFileName = filePath + backupFileExt;
    if (!opts.disposable) tryToRestore(backupFileName);

    const originalCodeBuffer = readFileSync(filePath);

    let compressionModule: CompressionModule;
    if (opts.compression) {
      compressionModule = require(resolve(process.cwd(), opts.compression));
    } else {
      compressionModule = {
        compressSync: ({ buffer }) => buffer,
        decompressSync: ({ buffer }) => buffer,
      };
    }

    const decompressedCode = compressionModule
      .decompressSync({
        buffer: originalCodeBuffer,
        path: filePath,
      })
      .toString();

    if (shouldInjectEnv(decompressedCode) === false) return;
    if (!opts.disposable) copyFileSync(filePath, backupFileName);

    const replacedCode = replaceAllPlaceholderWithEnv({
      code: decompressedCode,
      env,
    });

    const outputCode = compressionModule.compressSync({
      buffer: Buffer.from(replacedCode),
      path: filePath,
    });

    writeFileSync(filePath, outputCode);
  });
};

if (require.main === module) {
  main({ command: createCommand(), resolveEnv });
}
