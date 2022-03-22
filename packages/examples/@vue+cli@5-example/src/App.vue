<template>
  <h1>Hello: {{ hello }}</h1>
</template>

<script>
export default {
  name: "App",
  computed: {
    hello() {
      return import.meta.env.HELLO;
    },
  },
};
</script>
