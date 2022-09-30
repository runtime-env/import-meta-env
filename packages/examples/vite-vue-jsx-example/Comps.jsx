import { defineComponent } from "vue";

export const Named = defineComponent(() => {
  return () => <p>jsx named: {__ENV__.HELLO}</p>;
});

const NamedSpec = defineComponent(() => {
  return () => <p>jsx named spec: {__ENV__.HELLO}</p>;
});
export { NamedSpec };

export default defineComponent(() => {
  return () => <p>jsx: {__ENV__.HELLO}</p>;
});
