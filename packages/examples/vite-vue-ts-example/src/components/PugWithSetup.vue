<script setup lang="ts">
const hello = __ENV__.HELLO;
</script>

<template lang="pug">
p Pug with setup: {{ hello }}
</template>
