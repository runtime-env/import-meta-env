# Environment variables are always strings

If you need a `boolean` value:

```bash
export DEBUG="1"
```

```js
const debug = !!import.meta.env.DEBUG; // true
```

If you need a `number` value:

```bash
export PORT="3000"
```

```js
const port = parseInt(import.meta.env.PORT, 10); // 3000
```
