import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { parse } from "dotenv";
import { Args, createCommand } from "./create-command";
import { resolveEnvExampleKeys } from "../../shared/resolve-env-example-keys";

export const main = (args: Args) => {
  const envExampleKeys = resolveEnvExampleKeys({
    envExampleFilePath: args.example,
  });
  const env = args.path
    .map((p) => {
      p = resolve(process.cwd(), p);
      if (existsSync(p) === false) {
        writeFileSync(p, "", "utf8");
      }
      return parse(readFileSync(p, "utf8"));
    })
    .concat(
      args.userEnvironment
        ? [
            Object.keys(process.env).reduce<Record<string, string>>(
              (acc, k) => Object.assign(acc, { [k]: process.env[k] }),
              {},
            ),
          ]
        : [],
    )
    .reduce((env, partial) => Object.assign(env, partial), {});

  const stringifiedEnv =
    Object.keys(env)
      .sort()
      .filter((k) => envExampleKeys.includes(k))
      .map((k) => env[k].includes('#') ? `${k}='${env[k]}'` : `${k}=${env[k]}`)
      .join("\n") + "\n";

  writeFileSync(
    args.env,
    `# Generated by '@import-meta-env/prepare'\n\n${stringifiedEnv}`,
    "utf8",
  );
};

if (require.main === module) {
  const command = createCommand().parse();
  const args: Args = command.opts();
  main(args);
}
