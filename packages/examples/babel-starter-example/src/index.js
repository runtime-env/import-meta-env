import "@import-meta-env/virtual-module";
console.log(`Hello: ${import.meta.env.HELLO}`);
console.log(`JSON: ${JSON.stringify(JSON.parse(import.meta.env.JSON))}`);
