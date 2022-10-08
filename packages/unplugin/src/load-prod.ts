import hash from "object-hash";
import { UnpluginContextMeta } from "unplugin";
import { virtualFile, placeholder } from "../../shared";
import { parseExample } from "./parse-example";
import { ViteResolvedConfig } from "./vite/types";

export function loadProd({
  id,
  envExampleFilePath,
  meta,
  viteConfig,
}: {
  id: string;
  envExampleFilePath: string;
  meta: UnpluginContextMeta;
  viteConfig?: ViteResolvedConfig;
}) {
  if (id === virtualFile) {
    const parsedExample = parseExample({ envExampleFilePath });
    const hashValue = hash.keys(parsedExample);

    let envCode;
    switch (meta.framework) {
      case "vite":
        if (viteConfig === void 0)
          throw Error("[@import-meta-env/unplugin] internal error");
        envCode = `const e = Object.assign(${placeholder}, ${JSON.stringify(
          viteConfig.env
        )});`;
        break;

      default:
        envCode = `const e = ${placeholder};`;
        break;
    }

    return [
      `console.assert("${hashValue}"); // Invalidate the cache when the ${envExampleFilePath} changes.`,
      envCode,
      `export default e;`,
    ].join("\n");
  }
}
