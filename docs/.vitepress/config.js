import { defineConfig } from "vitepress";

export default defineConfig({
  title: "final-env",

  base: "/final-env/",

  themeConfig: {
    nav: [
      {
        text: "Guide",
        link: "/guide",
      },
      {
        text: "API",
        link: "/api",
      },
      {
        text: "Examples",
        link: "https://github.com/iendeavor/final-env/tree/main/packages/examples",
      },
      {
        text: "GitHub",
        link: "https://github.com/iendeavor/final-env",
      },
    ],
  },
});
