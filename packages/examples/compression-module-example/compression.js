const { brotliCompressSync, brotliDecompressSync } = require("zlib");

module.exports = {
  compressSync: ({ buffer, path }) => {
    if (path.endsWith(".br")) {
      return brotliCompressSync(buffer);
    } else {
      return buffer;
    }
  },
  decompressSync: ({ buffer, path }) => {
    if (path.endsWith(".br")) {
      return brotliDecompressSync(buffer);
    } else {
      return buffer;
    }
  },
};
