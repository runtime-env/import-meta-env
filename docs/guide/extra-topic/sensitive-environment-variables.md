# Sensitive Environment Variables

## Defining sensitive environment variables

It's always a good idea to provide all team members with information about required environment variables, including sensitive ones.

To do this, you can create two separate example files and pass the public file to the `example` option:

```ini
# .env.example.public
NAME=
```

```ini
# .env.example.private
SECRET_KEY=
```

## Accessing sensitive environment variables

You should use `process.env` to access sensitive environment variables in your code, since it's server-side only:

```js
const NAME = import.meta.env.NAME;
const SECRET_KEY = process.env.SECRET_KEY;
```
