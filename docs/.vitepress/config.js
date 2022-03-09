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
        text: "Config Reference",
        link: "/config-reference",
      },
      {
        text: "Examples",
        link: "/examples",
      },
      {
        text: "GitHub",
        link: "https://github.com/iendeavor/import-meta-env",
      },
    ],
  },
});
