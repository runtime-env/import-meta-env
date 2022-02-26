import { defineComponent } from "vue";

export const Named = defineComponent(() => {
  return () => <p>jsx named: {import.meta.env.HELLO}</p>;
});

const NamedSpec = defineComponent(() => {
  return () => <p>jsx named spec: {import.meta.env.HELLO}</p>;
});
export { NamedSpec };

export default defineComponent(() => {
  return () => <p>jsx: {import.meta.env.HELLO}</p>;
});
