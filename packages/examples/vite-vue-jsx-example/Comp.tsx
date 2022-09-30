import { defineComponent } from "vue";

export default defineComponent(() => {
  return () => <p>tsx: {__ENV__.HELLO}</p>;
});
