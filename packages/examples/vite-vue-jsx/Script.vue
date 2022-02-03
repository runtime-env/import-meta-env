<script lang="jsx">
import { defineComponent, ref } from "vue";

export default defineComponent(() => {
  const count = ref(4);
  const inc = () => count.value++;
  console.assert(import.meta.env.VITE_SCRIPT === "Script");

  return () => (
    <button class="script" onClick={inc}>
      script {count.value}
    </button>
  );
});
</script>
