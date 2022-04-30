/**
 * If your bundled pipeline is set to compress output,
 * for example, you can use `compression-webpack-plugin` to prepare compressed versions of assets,
 * in this case, you can provide a compression module for the `compression` option of the `import-meta-env` command.
 *
 * The `import-meta-env` CLI will use the compression module as follows:
 * 1. Use `decompressSync` to decompress the source file.
 * 2. Populate environment variables if the source file contains the placeholders.
 * 3. Use `compressSync` to compress and output the file.
 */
export interface CompressionModule {
  /**
   * Recompress the given buffer at the given file path.
   *
   * If the file is no need to be compressed, return the original buffer.
   */
  compressSync: ({ buffer, path }: { buffer: Buffer; path: string }) => Buffer;

  /**
   * Decompress the given buffer at the given file path.
   *
   * If the file is no need to be decompressed, return the original buffer.
   */
  decompressSync: ({
    buffer,
    path,
  }: {
    buffer: Buffer;
    path: string;
  }) => Buffer;
}
