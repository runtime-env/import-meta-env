document.querySelector("#app").innerHTML = `
  <h1>Hello: ${__ENV__.HELLO}</h1>
  <h1>Is legacy? ${import.meta.env.LEGACY}</h1>
`;
