// 1. Accessor cannot contain `eval` as it would violate CSP.
// 2. Accessor need to fallback to empty object, since during prerender there is no environment variables in globalThis.

export const DEFAULT_ACCESSOR_KEY = "import_meta_env";

export const createAccessor = (accessorKey = DEFAULT_ACCESSOR_KEY) =>
  `Object.create(globalThis.${accessorKey} || null)`;

// Keep backward compatibility
export const accessor = createAccessor();
