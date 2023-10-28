import "@import-meta-env/virtual-module";
document.querySelector("#app").innerHTML = `
  <h1>Hello: ${import.meta.env.HELLO}</h1>
`;
