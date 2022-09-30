import { defineComponent } from "vue";

export default defineComponent(() => {
  return () => <p>src import: {__ENV__.HELLO}</p>;
});
