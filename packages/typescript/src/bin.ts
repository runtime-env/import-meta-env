import { writeFileSync } from "fs";
import { resolve } from "path";
import { createDeclaration } from ".";
import { Args, createCommand } from "./create-command";

export const main = () => {
  const command = createCommand();
  command.parse();
  const opts: Args = command.opts();

  const declaration = createDeclaration(opts);

  const outputPath = resolve(
    process.cwd(),
    opts.outDir ?? ".",
    "import-meta-env.d.ts"
  );
  writeFileSync(outputPath, declaration, "utf8");
};

if (require.main === module) {
  main();
}
