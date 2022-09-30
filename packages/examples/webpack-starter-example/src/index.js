document.querySelector("body").innerHTML = `
  <h1>Foo: ${__ENV__.FOO}</h1>
  <h1>Bar: ${__ENV__.BAR}</h1>
  <h1>All: ${JSON.stringify(__ENV__)}</h1>
`;
