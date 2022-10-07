<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      hello: import.meta.env.HELLO,
    };
  },
});
</script>

<template>
  <p>Js: {{ hello }}</p>
</template>
