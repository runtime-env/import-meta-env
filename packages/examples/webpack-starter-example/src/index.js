document.querySelector("body").innerHTML = `
  <h1>Hello: ${import.meta.env.HELLO}</h1>
  <h1>JSON: ${JSON.stringify(JSON.parse(import.meta.env.JSON))}</h1>
`;
