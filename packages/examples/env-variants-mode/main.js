document.querySelector("#app").innerHTML = `
  <h1>VITE_ENV: ${import.meta.env.VITE_ENV}</h1>
  <h1>VITE_ENV_MODE: ${import.meta.env.VITE_ENV_MODE}</h1>
`;
