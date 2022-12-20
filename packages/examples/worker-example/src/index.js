const worker = new Worker(new URL("./worker.js", import.meta.url));

worker.onmessage = ({ data }) => {
  document.querySelector("body").innerHTML = `
    <h1>${data}</h1>
  `;
};
