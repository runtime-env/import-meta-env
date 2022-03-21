import { config as dotenvConfig } from "dotenv";
import hash from "object-hash";
import { UnpluginContextMeta } from "unplugin";
import { virtualFile, placeholder } from "../../shared";
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
  viteConfig: ViteResolvedConfig;
}) {
  if (id === virtualFile) {
    const parsedExample = (() => {
      const { parsed, error } = dotenvConfig({ path: envExampleFilePath });
      if (error) {
        return {};
      }
      return parsed!;
    })();
    const hashValue = hash.keys(parsedExample);

    let envCode;
    switch (meta.framework) {
      case "vite":
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
