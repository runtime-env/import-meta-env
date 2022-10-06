import { UserConfig } from "vite";
import { virtualFile } from "../../../shared";
import {
  OutputOptionsForObject,
  mergeManualChunksForObject,
} from "./merge-manual-chunks-for-object";

export const mergeManualChunks = (config: UserConfig): UserConfig => {
  let output: OutputOptionsForObject | OutputOptionsForObject[];

  const originalOutput = config.build?.rollupOptions?.output;
  if (originalOutput === undefined) {
    output = {
      manualChunks: {
        [virtualFile]: [virtualFile],
      },
    };
  } else if (Array.isArray(originalOutput)) {
    output = originalOutput.map((originalOutput) =>
      mergeManualChunksForObject(originalOutput)
    );
  } else {
    output = mergeManualChunksForObject(originalOutput);
  }

  return {
    ...config,
    build: {
      ...config.build,
      rollupOptions: {
        ...config.build?.rollupOptions,
        output,
      },
    },
  };
};
