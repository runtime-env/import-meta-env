module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  plugins: [["module:@final-env/babel", { example: ".env.example.public" }]],
};
