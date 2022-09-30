<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      hello: __ENV__.HELLO,
    };
  },
});
</script>

<template>
  <p>HTML: {{ hello }}</p>
</template>
