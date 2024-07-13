function API_URL() {
    return [
        Object.create(globalThis.import_meta_env || null).PROTOCOL,
        "//",
        Object.create(globalThis.import_meta_env || null).HOST
    ].join("");
}
