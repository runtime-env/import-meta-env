<template>
  <h1>Hello: {{ hello }}</h1>
</template>

<script>
export default {
  data() {
    return {
      hello: import.meta.env.HELLO,
    };
  },
};
</script>
