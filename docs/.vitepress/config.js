import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";
import { sentenceCase } from "change-case";
import { SitemapStream } from "sitemap";

const links = [];
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
      {
        text: "Migration",
        link: "/migration",
      },
      {
        text: "Examples",
        link: "https://github.com/iendeavor/import-meta-env/tree/main/packages/examples",
      },
      {
        text: "Sponsor",
        link: "https://www.paypal.com/paypalme/iendeavor/5",
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

  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },

  buildEnd: ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: "https://iendeavor.github.io/import-meta-env/",
    });
    const writeStream = fs.createWriteStream(
      path.resolve(outDir, "sitemap.xml")
    );
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    console.log("links", links);
    sitemap.end();
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
