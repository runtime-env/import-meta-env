/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly HELLO: string;
  readonly VSCODE: string;
  readonly ALT: string;
  readonly PUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
