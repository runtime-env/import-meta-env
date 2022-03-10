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
   * Explicity set whether to inline current environment variables into the code,
   * instead of inject environment variables via `import-meta-env` later.
   *
   * @default
   * process.env.NODE_ENV !== 'production'
   */
  shouldInlineEnv?: boolean;
}
