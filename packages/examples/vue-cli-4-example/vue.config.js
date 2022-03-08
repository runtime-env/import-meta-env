module.exports = {
  // Make output files easier to diff.
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      // Make output files easier to read.
      minimize: false,
    },
  },
};
