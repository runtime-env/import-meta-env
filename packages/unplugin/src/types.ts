export type Env = Record<string, string>;

export interface PluginOptions {
  /**
   * The .env file path to load
   *
   * You can out-out this by passing an empty string
   *
   * @default ".env"
   */
  env?: string;

  /**
   * The public .env example file path to load
   */
  example: string;

  /**
   * Compile-time: statically replace `import.meta.env.KEY` with `"value"`
   * Runtime: statically replace `import.meta.env` with a global accessor
   *
   * @default
   *
   * ```text
   * vite:    if mode is not `"production"` then `"compile-time"`, otherwise `"runtime"`
   * webpack: if mode is `"development"` or `"none"` then `"compile-time"`, otherwise `"runtime"`
   * rollup:  if `NODE_ENV` is not `"production"` then `"compile-time"`, otherwise `"runtime"`
   * esbuild: (needs to be set explicitly)
   * ```
   */
  transformMode?: "compile-time" | "runtime";
}
