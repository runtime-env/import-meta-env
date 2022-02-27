import { backupFileExt } from "./shared";

export function isBackupFileName(outputFileName: string) {
  return outputFileName.endsWith(backupFileExt);
}
