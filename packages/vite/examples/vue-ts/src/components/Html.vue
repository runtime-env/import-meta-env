<script lang="ts">
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
  <p>HTML: {{ hello }}</p>
</template>
