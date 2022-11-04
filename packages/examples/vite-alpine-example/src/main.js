import Alpine from "alpinejs";

Alpine.store("import", {
  meta: {
    env: {
      HELLO: import.meta.env.HELLO,
    },
  },
});

Alpine.start();
