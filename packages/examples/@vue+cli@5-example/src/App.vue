<template>
  <h1>Hello: {{ hello }}</h1>
</template>

<script>
export default {
  name: "App",
  computed: {
    hello() {
      return __ENV__.HELLO;
    },
  },
};
</script>
