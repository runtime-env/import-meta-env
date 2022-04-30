const { brotliCompressSync, brotliDecompressSync } = require("zlib");

module.exports = {
  shouldProcess: ({ path }) => path.endsWith(".br"),
  compressSync: ({ buffer, path }) => brotliCompressSync(buffer),
  decompressSync: ({ buffer, path }) => brotliDecompressSync(buffer),
};
