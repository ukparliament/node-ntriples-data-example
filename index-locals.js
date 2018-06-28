'use strict';

const FILE = './data/data.nt';
const CODE = './assets/javascripts/toJSON.js';

const fs = require('fs');
const toJSON = require(CODE);

fs.open(FILE, 'r', (err, fd) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log(`${file} does not exist`);
      return;
    }

    throw err;
  }

  fs.readFile(FILE, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    toJSON(data); // Converts to JSON here

    fs.close(fd, (err) => {
      if (err) {
        throw err;
      }
    });
  });
});
