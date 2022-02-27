import { createUnplugin } from "unplugin";
import { virtualFile } from "../../../shared";
import {
  OutputOptions,
  mergeManualChunks as mergeManualChunksForObject,
} from "../rollup/merge-manual-chunks";

export type UserConfig = Parameters<
  Exclude<
    ReturnType<ReturnType<typeof createUnplugin>["vite"]>["config"],
    undefined
  >
>["0"];

export const mergeManualChunks = (config: UserConfig): UserConfig => {
  let output: OutputOptions | OutputOptions[];

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
