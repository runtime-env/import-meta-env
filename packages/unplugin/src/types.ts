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
   *
   * true, "if running with `vite` or `vite dev`"
   * true, "if webpack mode is NOT `production` or `undefined`"
   * true, "if `NODE_ENV` is NOT `production`"
   * false, "otherwise"
   */
  shouldInlineEnv?: boolean;
}
