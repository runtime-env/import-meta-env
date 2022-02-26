// This config completely optional.

export default (assetsDir = "assets") => ({
  build: {
    // Make output files easier to read.
    minify: false,

    rollupOptions: {
      output: {
        // Make output files easier to diff.
        chunkFileNames: `${assetsDir}/[name].js`,
        entryFileNames: `${assetsDir}/[name].js`,
      },
    },
  },
});
