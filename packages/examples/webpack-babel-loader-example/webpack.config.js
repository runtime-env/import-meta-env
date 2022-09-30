module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["module:@final-env/babel", { example: ".env.example.public" }],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    // Make output files easier to read.
    minimize: false,
  },
};
