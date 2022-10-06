import { virtualFile } from "../../../shared";
import { UserConfig } from "vite";

type OutputOptions = Exclude<
  Exclude<
    Exclude<UserConfig["build"], undefined>["rollupOptions"],
    undefined
  >["output"],
  undefined
>;
export type OutputOptionsForObject = Exclude<OutputOptions, any[]>;

export function mergeManualChunksForObject(
  originalOutput: OutputOptionsForObject
): OutputOptionsForObject {
  let output: OutputOptionsForObject;

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
