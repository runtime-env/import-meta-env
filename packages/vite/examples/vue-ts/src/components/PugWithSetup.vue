<script setup lang="ts">
const hello = import.meta.env.HELLO;
</script>

<template lang="pug">
p Pug with setup: {{ hello }}
</template>
