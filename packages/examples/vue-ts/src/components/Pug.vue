<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      pug: import.meta.env.PUG,
    };
  },
});
</script>

<template lang="pug">
p Pug: {{ pug }}
</template>
