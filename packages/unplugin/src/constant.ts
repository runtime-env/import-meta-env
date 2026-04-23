import { createAccessor } from "../../shared/constant";

export const createAccessorRegExp = (
  suffix: string,
  quote: "single" | "double" = "double",
  accessorKey?: string,
) =>
  new RegExp(
    "\\b" +
      createAccessor(accessorKey)
        .replace(/\\/g, "\\\\")
        .replace(/([\(\)\[\]\|])/g, "\\$1")
        .replace(/\s/g, "\\s*")
        .replace(/"/g, quote === "double" ? '"' : "'") +
      suffix,
    "g",
  );
