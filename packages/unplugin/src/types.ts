export interface PluginOptions {
  /**
   * The .env file path to load
   *
   * @default ".env"
   */
  env?: string;

  /**
   * The .env example file path to load
   *
   * @default ".env.example"
   */
  envExample?: string;

  /**
   * Explicity set whether to inline current environment variables into the code,
   * instead of inject environment variables via `import-meta-env` later.
   *
   * This is useful if you want to use the plugin in unknown dev server environments
   *
   * @default
   * `true` if following conditions are met, otherwise `false`:
   *
   * ```text
   * vite:    if running with dev server, i.e. `vite`, `vite dev`, or `vite serve`
   * webpack: if running with watch mode or `mode` is `development` or `none`
   * rollup:  if running with watch mode
   * others:  if `NODE_ENV` is NOT `production`
   * ```
   */
  shouldInlineEnv?: boolean;
}
