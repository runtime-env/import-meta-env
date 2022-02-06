import "./style.css";

(async () => {
  const greeting = await import("./greeting").then((m) => m.greeting);
  document.querySelector("#app").innerHTML = `
    <h1>${greeting}</h1>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  `;
})();
