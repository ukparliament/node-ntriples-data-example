'use strict';

const https = require('https');

function requestFile(file, callback) {

  https.get(file, res => {

    let data = '';

    res.on('data', d => {
      data += Buffer.from(d).toString();
    });

    res.on('end', () => {
      callback(data);
    });

  })

  .on('error', err => {
    console.log(err);
  })

  .end();

}

module.exports = requestFile;
