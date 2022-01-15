import type { key } from "../../shared";

export interface RuntimeConfig {}

declare global {
  interface Window {
    [key]: RuntimeConfig;
  }
}
