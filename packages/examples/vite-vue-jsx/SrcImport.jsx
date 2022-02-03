import { defineComponent, ref } from "vue";

export default defineComponent(() => {
  const count = ref(5);
  const inc = () => count.value++;
  console.assert(import.meta.env.VITE_SRC_IMPORT_JSX === "SrcImportJsx");

  return () => (
    <button class="src-import" onClick={inc}>
      src import {count.value}
    </button>
  );
});
