module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["module:@import-meta-env/babel", { example: ".env.example.public" }],
  ],
};
