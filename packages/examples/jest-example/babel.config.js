module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  plugins: [
    ["module:@import-meta-env/babel", { example: ".env.example.public" }],
  ],
};
