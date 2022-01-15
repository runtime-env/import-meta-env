import { key } from "../../shared";
import { RuntimeConfig } from "./types";

const runtimeConfig: RuntimeConfig = (() => {
  if (typeof window !== "undefined") {
    return window[key];
  } else {
    return {};
  }
})();

// TODO: K should not be inferred to `never`
// export const getRuntimeConfig = <K extends keyof RuntimeConfig>(key: K): RuntimeConfig[K];
export const getRuntimeConfig = (key: string): string => {
  return runtimeConfig[key as keyof RuntimeConfig];
};

export * from "./types";
