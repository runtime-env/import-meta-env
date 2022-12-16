// You can write your own logic here to determine the actual url
window.app2Url = `http://localhost:${process.env.PORT2}`;

// Use dynamic import here to allow webpack to interface with module federation code
import("./bootstrap");
