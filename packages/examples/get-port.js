const getPort = require("portfinder").getPort;

/**
 * @returns {number} port
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    // prevent using same port when running in parallel
    const minimumPort = Math.floor(Math.random() * Math.pow(2, 15) + 8000);
    getPort({ port: minimumPort }, (err, port) => {
      if (err) {
        reject(err);
      } else {
        console.log(`port: ${port}`);
        resolve(port);
      }
    });
  });
};
