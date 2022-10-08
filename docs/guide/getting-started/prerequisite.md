# Prerequisite

## The `.env.example` File

For security reasons, we need to explicitly define which environment variables should be exposed to the browser.

You can do this by creating a `.env.example` file in your project:

```ini
# .env.example
API_BASE_URL=
```

## Source of environment variables

We make no assumptions about the source of environment variables.

The following are commonly used methods:

- You can define environment variables directly in your system:

  ```sh
  export API_BASE_URL=https://httpbin.org
  ```

- For convenience, you can also create a `.env.development` file in your project instead of manipulating environment variables in the system:

  ```ini
  ; .env.development
  API_BASE_URL=https://httpbin.org
  ```

- Or you can even write it in package.json:

  ```json
  {
    "scripts": {
      "dev": "cross-env API_BASE_URL=https://httpbin.org webpack --mode development"
    }
  }
  ```
