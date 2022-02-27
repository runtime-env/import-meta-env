import { virtualFile } from "../../../shared";

export type GetManualChunk = (
  id: string,
  ...args: any
) => string | null | undefined;

export type ManualChunksOption =
  | { [chunkAlias: string]: string[] }
  | GetManualChunk;

export type OutputOptions = {
  manualChunks?: ManualChunksOption | undefined;
};

export function mergeManualChunks(
  originalOutput: OutputOptions
): OutputOptions {
  let output: OutputOptions;

  const manualChunks = originalOutput.manualChunks;
  if (manualChunks === undefined) {
    output = {
      ...originalOutput,
      manualChunks: {
        [virtualFile]: [virtualFile],
      },
    };
  } else if (typeof manualChunks === "function") {
    output = {
      ...originalOutput,
      manualChunks: (id, api) => {
        const result = manualChunks(id, api);
        if (result === undefined && id === virtualFile) {
          return virtualFile;
        }
        return result;
      },
    };
  } else {
    output = {
      ...originalOutput,
      manualChunks: {
        [virtualFile]: [virtualFile],
        ...manualChunks,
      },
    };
  }

  return output;
}
