<template>
  <h1>Hello: {{ hello }}</h1>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      hello: __ENV__.HELLO,
    };
  },
};
</script>
