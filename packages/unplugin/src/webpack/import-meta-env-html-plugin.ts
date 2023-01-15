import type { Compiler } from "webpack";
import { Env } from "../types";
import { transformIndexHtmlDev } from "../transform-index-html-dev";

export class ImportMetaHtmlPlugin {
  private env: Env;
  private example: readonly string[];

  constructor({ env, example }: { env: Env; example: readonly string[] }) {
    this.env = env;
    this.example = example;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      {
        name: "ImportMetaEnvHtmlPlugin",
      },
      (compilation, { normalModuleFactory }) => {
        const HtmlWebpackPlugin = require("safe-require")(
          "html-webpack-plugin"
        );
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          "ImportMetaEnvPlugin",
          (data: any, cb: any) => {
            data.html = transformIndexHtmlDev({
              code: data.html,
              env: this.env,
              example: this.example,
            });
            cb(null, data);
          }
        );
      }
    );
  }
}
