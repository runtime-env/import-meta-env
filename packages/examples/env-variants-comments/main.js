document.querySelector("#app").innerHTML = `
  <h1>FOO: ${import.meta.env.VITE_FOO}</h1>
  <h1>BAR: ${import.meta.env.VITE_BAR}</h1>
`;
