module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module:@import-meta-env/babel",
      { env: ".custom-env-path", example: ".env.example" },
    ],
  ],
};
