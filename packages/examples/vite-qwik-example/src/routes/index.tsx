import { component$, useStore, useClientEffect$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const env = useStore({
    HELLO: ''
  });
  useClientEffect$(() => {
    env.HELLO = import.meta.env.HELLO
  }, { eagerness: 'load' });
  return <div>Hello: {env.HELLO}</div>;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
