<script lang="ts">
import { defineComponent } from "vue";
import Js from "./components/Js.vue";
import JsWithSetup from "./components/JsWithSetup.vue";
import Html from "./components/Html.vue";
import HtmlWithSetup from "./components/HtmlWithSetup.vue";
import Pug from "./components/Pug.vue";
import PugWithSetup from "./components/PugWithSetup.vue";

export default defineComponent({
  components: {
    Js,
    JsWithSetup,
    Html,
    HtmlWithSetup,
    Pug,
    PugWithSetup,
  },
});
</script>

<template>
  <Js />
  <JsWithSetup />
  <Html />
  <HtmlWithSetup />
  <Pug />
  <PugWithSetup />
</template>
