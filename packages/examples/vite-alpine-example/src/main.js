import Alpine from "alpinejs";

Alpine.store("env", {
  HELLO: import.meta.env.HELLO,
});

Alpine.start();
