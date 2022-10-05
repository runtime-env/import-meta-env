# Why use ImportMeta

Since `process.env` is a Node specific object, we should not use it in browser environment.

For server-side rendering, it is also more precise to use `import.meta.env` (heavily inspired by Vite) and `process.env` respectively.
