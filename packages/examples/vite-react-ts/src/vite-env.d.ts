/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
