import { accessor } from "../../shared/constant";

export const createAccessorRegExp = (
  suffix: string,
  quote: "single" | "double" = "double",
) =>
  new RegExp(
    "\\b" +
      accessor
        .replace(/\\/g, "\\\\")
        .replace(/([\(\)\[\]\|])/g, "\\$1")
        .replace(/\s/g, "\\s*")
        .replace(/"/g, quote === "double" ? '"' : "'") +
      suffix,
    "g",
  );
