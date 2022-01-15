import { scriptTemplate, key } from "../../shared";
import cheerio from "cheerio";
import dotenv from "dotenv";
import { Plugin } from "vite";

const createPlugin = (options?: { dotenv?: dotenv.DotenvConfigOptions }) => {
  const plugin: Plugin = {
    name: "runtime-config",

    transformIndexHtml(html) {
      const document = cheerio.load(html);
      if (process.env.NODE_ENV === "production") {
        document("body").append(scriptTemplate);
      } else {
        const config = JSON.stringify(dotenv.config(options?.dotenv).parsed);
        const script = `<script>window.${key}=${config}</script>`;
        document("body").append(script);
      }
      return document.html();
    },
  };

  return plugin;
};

export default createPlugin;
