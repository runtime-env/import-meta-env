# Vite

<br/>

## The [Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)

During production, the following variables will be statically replaced just like Vite:

- [Built-in](https://vitejs.dev/guide/env-and-mode.html#env-variables) variables: `MODE`, `BASE_URL`, `PROD`, and `DEV`.

- [Server-side rendering](https://vitejs.dev/guide/ssr.html#conditional-logic) variable: `SSR`.

- [@vitejs/plugin-legacy](https://vitejs.dev/plugins/#vitejs-plugin-legacy) variable: `LEGACY`.

- [envPrefix](https://vitejs.dev/config/index.html#envprefix) variables. You can disable it by setting `envPrefix` to `[]` (**Recommended**).
