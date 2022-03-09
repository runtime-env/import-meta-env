module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  plugins: [["module:@import-meta-env/babel", { example: ".env.example" }]],
};
