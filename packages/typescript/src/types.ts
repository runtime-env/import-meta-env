export interface Options {
  /**
   * The public .env example file path to load
   */
  example: string;

  /**
   * Output path for import-meta-env.d.ts
   *
   * @default .
   */
  outDir?: string;
}
