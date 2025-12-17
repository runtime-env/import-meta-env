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
   * process.env.NODE_ENV === "production" ? "runtime" : "compile-time"
   */
  transformMode?: "compile-time" | "runtime";

  /**
   * The global variable key used to access environment variables at runtime.
   * This determines the property name on `globalThis` where env vars are stored.
   *
   * @default "import_meta_env"
   * @example
   * // With accessorKey: "my_env", the plugin transforms:
   * // import.meta.env.API_URL -> Object.create(globalThis.my_env || null).API_URL
   */
  accessorKey?: string;
}
