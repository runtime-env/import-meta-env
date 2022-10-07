import Alpine from "alpinejs";

Alpine.store("import", {
  meta: {
    env: import.meta.env,
  },
});

Alpine.start();
