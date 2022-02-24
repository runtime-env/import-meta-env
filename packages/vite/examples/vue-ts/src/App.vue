<script lang="ts">
import { defineComponent } from "vue";
import Html from "./components/Html.vue";
import HtmlWithSetup from "./components/HtmlWithSetup.vue";
import Pug from "./components/Pug.vue";
import PugWithSetup from "./components/PugWithSetup.vue";

export default defineComponent({
  components: {
    Html,
    HtmlWithSetup,
    Pug,
    PugWithSetup,
  },
});
</script>

<template>
  <Html />
  <HtmlWithSetup />
  <Pug />
  <PugWithSetup />
</template>
