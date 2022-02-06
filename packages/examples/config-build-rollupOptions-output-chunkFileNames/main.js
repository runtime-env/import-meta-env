(async () => {
  const greeting = await import("./greeting").then((m) => m.greeting);
  document.querySelector("#app").innerHTML = `
    <h1>VITE_NAME: ${greeting}</h1>
  `;
})();
