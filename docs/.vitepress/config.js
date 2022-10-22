import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import { sentenceCase } from "change-case";

export default defineConfig({
  title: "Import-meta-env",

  base: "/import-meta-env/",

  head: [
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-9QTYWHDXCJ",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){window.dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-9QTYWHDXCJ');",
    ],
  ],

  themeConfig: {
    nav: [
      {
        text: "Guide",
        activeMatch: "/guide/",
        link: "/guide/getting-started/introduction",
      },
      {
        text: "API",
        link: "/api",
      },
    ],

    sidebar: sidebar(),

    socialLinks: [
      { icon: "github", link: "https://github.com/iendeavor/import-meta-env" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright:
        "Created by <a href='https://github.com/iendeavor' target='_blank'>Ernest</a>",
    },
  },
});

function sidebar() {
  return {
    "/guide": genSidebarItems(path.resolve(__dirname, "..", "guide")),
  };
}

function genSidebarItems(rootDir) {
  /**
   * @type {import('vitepress').DefaultTheme.SidebarItem[]}
   */
  const sidebarItems = [];

  const dirs = fs.readdirSync(rootDir).filter((p) => p !== "__order.json");

  if (fs.existsSync(path.resolve(rootDir, "__order.json"))) {
    /**
     * @type {string[]}
     */
    const order = JSON.parse(
      fs.readFileSync(path.resolve(rootDir, "__order.json"))
    );
    dirs.sort(
      (a, b) =>
        order.indexOf(a.replace(/\.md$/, "")) -
        order.indexOf(b.replace(/\.md$/, ""))
    );
  }

  dirs.forEach((p) => {
    const absP = path.resolve(rootDir, p);
    if (fs.lstatSync(absP).isDirectory()) {
      sidebarItems.push({
        text: sentenceCase(p),
        items: genSidebarItems(absP),
      });
    } else {
      sidebarItems.push({
        text: sentenceCase(p.replace(/\.md$/, "")),
        link: absP.replace(path.resolve(__dirname, ".."), ""),
      });
    }
  });

  return sidebarItems;
}
