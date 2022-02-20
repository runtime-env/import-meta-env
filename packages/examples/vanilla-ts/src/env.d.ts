/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly HELLO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
