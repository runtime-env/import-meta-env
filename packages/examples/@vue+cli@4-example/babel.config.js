module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [["module:@final-env/babel", { example: ".env.example.public" }]],
};
