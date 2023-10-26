const request = require("request");
const fs = require("fs");

const fetcher = () => {
  // if url and file path not supplied, terminate application
  if (process.argv.length < 4) return;

  // variables for provided URL and file path
  const url = process.argv[2];
  const file = process.argv[3];

  // make a request to url and print the body
  request(url, (connErr, resp, body) => {
    // if error, print error message and exit function
    if (connErr) {
      console.log(`Connection error: ${connErr}`);
      return;
    }

    // write contents of url request to file
    fs.writeFile(file, body, writeErr => {
      let stats = fs.statSync(file);
      // get size of file that was written to
      let sizeBytes = stats.size;
      
      // if error, print error message and exit function
      if (writeErr) {
        console.log(`Write error: ${writeErr}`)
        return;
      }

      // print write success message and size of data written to file
      console.log(`Downloaded and saved ${sizeBytes} bytes to ${file}`);
      return;
    });
  });

};

fetcher();