import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const hello = useSignal("");
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    hello.value = import.meta.env.HELLO;
  });
  return <div>Hello: {hello}</div>;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
};
