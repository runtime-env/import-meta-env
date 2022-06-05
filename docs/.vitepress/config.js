import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Import-meta-env",

  base: "/import-meta-env/",

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
        link: "https://github.com/iendeavor/import-meta-env/tree/main/packages/examples",
      },
      {
        text: "GitHub",
        link: "https://github.com/iendeavor/import-meta-env",
      },
    ],
  },
});
