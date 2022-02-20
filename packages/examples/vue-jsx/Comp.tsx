import { defineComponent, ref } from "vue";

const Default = defineComponent(() => {
  const count = ref(3);
  const inc = () => count.value++;
  console.assert(import.meta.env.COMP === "Comp");

  return () => (
    <button class="default-tsx" onClick={inc}>
      default tsx {count.value}
    </button>
  );
});

export default Default;
