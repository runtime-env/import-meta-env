import { createUnplugin } from "unplugin";
import { virtualId, virtualFile } from "../../../shared";

type UserConfig = Parameters<
  Exclude<
    ReturnType<ReturnType<typeof createUnplugin>["vite"]>["config"],
    undefined
  >
>["0"];

type OutputOptions = Exclude<
  Exclude<
    Exclude<
      Exclude<UserConfig, undefined>["build"],
      undefined
    >["rollupOptions"],
    undefined
  >["output"],
  undefined | any[]
>;

export const mergeManualChunks = (config: UserConfig): UserConfig => {
  let output: OutputOptions | OutputOptions[];

  const originalOutput = config.build?.rollupOptions?.output;
  if (originalOutput === undefined) {
    output = {
      manualChunks: {
        [virtualFile]: [virtualId],
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

export function mergeManualChunksForObject(
  originalOutput: OutputOptions
): OutputOptions {
  let output: OutputOptions;

  const manualChunks = originalOutput.manualChunks;
  if (manualChunks === undefined) {
    output = {
      ...originalOutput,
      manualChunks: {
        [virtualFile]: [virtualId],
      },
    };
  } else if (typeof manualChunks === "function") {
    output = {
      ...originalOutput,
      manualChunks: (id, api) => {
        const result = manualChunks(id, api);
        if (result === undefined && id === virtualId) {
          return virtualFile;
        }
        return result;
      },
    };
  } else {
    output = {
      ...originalOutput,
      manualChunks: {
        [virtualFile]: [virtualId],
        ...manualChunks,
      },
    };
  }

  return output;
}
