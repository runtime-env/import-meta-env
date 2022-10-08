import picocolors from "picocolors";
import { readFileSync, writeFileSync } from "fs";

{
  const indexPath = "dist/index.js";
  let code = readFileSync(indexPath, "utf-8");
  const moduleExportsLine = `module.exports = __toCommonJS(src_exports);`;
  if (code.includes(moduleExportsLine)) {
    code = code.replace(
      moduleExportsLine,
      `module.exports = createPlugin;\ncreatePlugin['default'] = createPlugin;`
    );

    writeFileSync(indexPath, code);

    console.log(
      picocolors.bold(
        `${indexPath} patched with overwrite for cjs require('...')()`
      )
    );
  }
}

{
  const indexPath = "dist/index.d.ts";
  let code = readFileSync(indexPath, "utf-8");
  const exportDefaultLine = `export default createPlugin;`;
  if (code.includes(exportDefaultLine)) {
    code = code.replace(exportDefaultLine, "export = createPlugin;");

    writeFileSync(indexPath, code);

    console.log(
      picocolors.bold(
        `${indexPath} patched with overwrite for cjs require('...')()`
      )
    );
  }
}
