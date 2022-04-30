export interface CompressionModule {
  compressSync: ({ buffer, path }: { buffer: Buffer; path: string }) => Buffer;
  decompressSync: ({
    buffer,
    path,
  }: {
    buffer: Buffer;
    path: string;
  }) => Buffer;
}
