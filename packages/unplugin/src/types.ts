export type Env = Record<string, string>;

export interface PluginOptions {
  /**
   * The .env file path to load
   *
   * @default ".env"
   */
  env?: string;

  /**
   * The public .env example file path to load
   */
  example: string;

  /**
   * Explicitly set whether to inline current environment variables into the code,
   * instead of inject environment variables via `import-meta-env` later.
   *
   * This is useful if you want to use the plugin in unknown dev server environments
   *
   * @default
   * `true` if following conditions are met, otherwise `false`:
   *
   * ```text
   * vite:    if mode is not `"production"`
   * webpack: if mode is `"development"` or `"none"`
   * rollup:  if `NODE_ENV` is not `"production"`
   * esbuild: (needs to be set explicitly)
   * ```
   */
  shouldInlineEnv?: boolean;
}
