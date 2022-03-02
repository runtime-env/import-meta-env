import { placeholder } from "../../../shared";
import { Compiler, javascript, dependencies } from "webpack";

export class ImportMetaPlugin {
  apply(compiler: Compiler) {
    const parserHandler = (parser: javascript.JavascriptParser) => {
      parser.hooks.expression
        .for("import.meta.env")
        .tap("ImportMetaPlugin", (expr) => {
          const dep = new dependencies.ConstDependency(
            placeholder,
            expr.range!
          );
          dep.loc = expr.loc!;
          parser.state.module.addPresentationalDependency(dep);

          return true;
        });
    };

    compiler.hooks.compilation.tap(
      {
        name: "ImportMetaEnvPlugin",
        before: "ImportMetaPlugin",
      },
      (_, { normalModuleFactory }) => {
        normalModuleFactory.hooks.parser
          .for("javascript/auto")
          .tap("ImportMetaPlugin", parserHandler);

        normalModuleFactory.hooks.parser
          .for("javascript/esm")
          .tap("ImportMetaPlugin", parserHandler);
      }
    );
  }
}
