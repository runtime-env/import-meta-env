import { defineComponent } from "vue";

export default defineComponent(() => {
  return () => <p>tsx: {import.meta.env.HELLO}</p>;
});
