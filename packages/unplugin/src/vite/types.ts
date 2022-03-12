import { createUnplugin } from "unplugin";

export type ViteResolvedConfig = Parameters<
  Exclude<
    ReturnType<ReturnType<typeof createUnplugin>["vite"]>["configResolved"],
    undefined
  >
>["0"];
