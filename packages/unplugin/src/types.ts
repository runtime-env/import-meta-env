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
}
