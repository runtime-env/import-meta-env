import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Import-meta-env",

  base: "/import-meta-env/",

  themeConfig: {
    nav: [
      {
        text: "Guide",
        activeMatch: "/guide/",
        link: "/guide/getting-started/the-env-example-file",
      },
      {
        text: "API",
        link: "/api",
      },
      {
        text: "Examples",
        link: "https://github.com/iendeavor/import-meta-env/tree/main/packages/examples",
      },
    ],

    sidebar: {
      "/guide": [
        {
          text: "Getting Started",
          items: [
            {
              text: "The `.env.example` file",
              link: "/guide/getting-started/the-env-example-file",
            },
            {
              text: "Installation",
              link: "/guide/getting-started/installation",
            },
            {
              text: "Usage",
              link: "/guide/getting-started/usage",
            },
          ],
        },
        {
          text: "Integration",
          items: [
            {
              text: "TypeScript",
              link: "/guide/integration/typescript",
            },
          ],
        },
        {
          text: "Extra Topic",
          items: [
            {
              text: "Sensitive environment variables",
              link: "/guide/extra-topic/sensitive-environment-variables",
            },
            {
              text: "Local development",
              link: "/guide/extra-topic/local-development",
            },
          ],
        },
        {
          text: "Framework Specific Notes",
          items: [
            {
              text: "Vite",
              link: "/guide/framework-specific-notes/vite",
            },
          ],
        },
        {
          text: "FAQ",
          items: [
            {
              text: "Why use import meta",
              link: "/guide/faq/why-use-import-meta",
            },
            {
              text: "Environment variables are always strings",
              link: "/guide/faq/environment-variables-are-always-strings",
            },
            {
              text: "Changes to environment variables is not updated",
              link: "/guide/faq/changes-to-environment-variables-is-not-updated",
            },
            {
              text: "Can i have multiple env files",
              link: "/guide/faq/can-i-have-multiple-env-files",
            },
            {
              text: "Should i commit my env file",
              link: "/guide/faq/should-i-commit-my-env-file",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/iendeavor/import-meta-env" },
    ],
  },
});
