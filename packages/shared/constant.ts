export const virtualFile = "import-meta-env";

// 1. Accessor cannot contain `eval` as it would violate CSP.
// 2. Accessor need to fallback to empty object, since during prerender there is no environment variables in globalThis.
export const accessor = `Object.create(globalThis.import_meta_env || null)`;

export const envFilePath = ".env";
