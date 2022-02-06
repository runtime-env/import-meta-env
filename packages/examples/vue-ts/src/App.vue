<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Pug from "./components/Pug.vue";
import { greeting } from "./greeting";

export default defineComponent({
  components: {
    HelloWorld,
    Pug,
  },
  setup() {
    return {
      alt: import.meta.env.VITE_ALT,
      greeting,
    };
  },
});
</script>

<template>
  <img :alt="alt" src="./assets/logo.png" />
  <HelloWorld :msg="greeting" />
  <Pug />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
