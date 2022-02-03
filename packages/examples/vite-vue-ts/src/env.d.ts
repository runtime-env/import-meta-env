/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_NAME: string;
  readonly VITE_VSCODE: string;
  readonly VITE_ALT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
