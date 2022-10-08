import { writeFileSync } from "fs";
import { tmpNameSync } from "tmp";
import { warnEnvPrefix } from "../warn-env-prefix";

test("when viteConfigEnvPrefix is undefined", () => {
  const envExampleFilePath = tmpNameSync();
  writeFileSync(envExampleFilePath, "FOO=\nBAR=\nVITE_BAR=\nVITE_QUX=", "utf8");
  const warn = jest.fn();

  warnEnvPrefix({
    envExampleFilePath: envExampleFilePath,
    viteConfigEnvPrefix: void 0,
    warn,
  });

  expect(warn).toBeCalledTimes(3);
});

test("when viteConfigEnvPrefix is string", () => {
  const envExampleFilePath = tmpNameSync();
  writeFileSync(
    envExampleFilePath,
    "FOO=\nBAR=\nCUSTOM_BAR=\nCUSTOM_QUX=",
    "utf8"
  );
  const warn = jest.fn();

  warnEnvPrefix({
    envExampleFilePath: envExampleFilePath,
    viteConfigEnvPrefix: "CUSTOM_",
    warn,
  });

  expect(warn).toBeCalledTimes(3);
});

test("when viteConfigEnvPrefix is undefined", () => {
  const envExampleFilePath = tmpNameSync();
  writeFileSync(
    envExampleFilePath,
    "FOO=\nBAR=\nVITE_BAR=\nCUSTOM_QUX=",
    "utf8"
  );
  const warn = jest.fn();

  warnEnvPrefix({
    envExampleFilePath: envExampleFilePath,
    viteConfigEnvPrefix: ["VITE_", "CUSTOM_"],
    warn,
  });

  expect(warn).toBeCalledTimes(3);
});
