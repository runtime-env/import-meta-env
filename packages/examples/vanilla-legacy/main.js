document.querySelector("#app").innerHTML = `
  <h1>VITE_NAME: ${import.meta.env.VITE_NAME}</h1>
  <h1>Is legacy? ${import.meta.env.LEGACY}</h1>
`;
