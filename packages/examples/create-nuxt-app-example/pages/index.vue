<template>
  <h1>Hello: {{ hello }}</h1>
</template>

<script>
import "@import-meta-env/virtual-module";

export default {
  name: "IndexPage",

  data() {
    return {
      hello: import.meta.env.HELLO,
    };
  },
};
</script>
