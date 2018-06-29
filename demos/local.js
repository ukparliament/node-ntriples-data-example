'use strict';

const fs = require('fs');
const toJSON = require('../assets/javascripts/toJSON');

const FILE = './demos/data/data.nt';

fs.open(FILE, 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log(`${FILE} does not exist`);
      return;
    }

    throw err;
  }

  fs.readFile(FILE, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(toJSON(data)); // Converts to JSON here

    fs.close(fd, (err) => {
      if (err) {
        throw err;
      }
    });
  });
});
