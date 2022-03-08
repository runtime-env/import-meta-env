module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [["module:@import-meta-env/babel", { example: ".env.example" }]],
};
