import { copyFileSync, existsSync } from "fs";
import { backupFileExt } from "./shared";

export function tryToRestore(backupFileName: string) {
  if (backupFileName.endsWith(backupFileExt)) {
    if (existsSync(backupFileName)) {
      const originalFileName = backupFileName.slice(
        0,
        -1 * backupFileExt.length
      );
      copyFileSync(backupFileName, originalFileName);
    }
  } else {
    throw SyntaxError(`Invalid backup file name "${backupFileName}"`);
  }
}
