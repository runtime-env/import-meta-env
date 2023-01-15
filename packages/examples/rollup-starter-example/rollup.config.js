import resolve from "@rollup/plugin-node-resolve";
import importMetaEnv from "@import-meta-env/unplugin";
import html, { makeHtmlAttributes } from "@rollup/plugin-html";

const dev = {
  input: "src/main.js",
  output: {
    dir: "output",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    html({ template }),
    resolve(),
    importMetaEnv.rollup({ example: ".env.example.public" }),
  ],
};

const prod = {
  input: "src/main.js",
  output: {
    dir: "output",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    html({ template }),
    resolve(),
    importMetaEnv.rollup({ example: ".env.example.public" }),
  ],
};

async function template({ attributes, files, meta, publicPath, title }) {
  const importMetaEnvPlaceholder = `<script>globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"')</script>\n`;
  const app = `<div id='app'></div>\n`;

  // defaultTemplate: https://github.com/rollup/plugins/blob/a2e582a3eac135030532186ae664466d0441a6b7/packages/html/src/index.ts#L29
  const scripts =
    importMetaEnvPlaceholder +
    app +
    (files.js || [])
      .map(({ fileName }) => {
        const attrs = makeHtmlAttributes(attributes.script);
        return `<script src="${publicPath}${fileName}"${attrs}></script>`;
      })
      .join("\n");

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join("\n");

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join("\n");

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>${title}</title>
    ${links}
  </head>
  <body>
    ${scripts}
  </body>
</html>`;
}

export default process.env.NODE_ENV === "production" ? prod : dev;
