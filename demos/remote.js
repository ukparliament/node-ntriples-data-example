'use strict';

const https = require('https');
const toJSON = require('../assets/javascripts/toJSON');

const FILE = 'https://api.parliament.uk/Live/fixed-query/person_by_id?person_id=TyNGhslR';

https.get(FILE, res => {

  let data = '';

  res.on('data', d => {
    data += Buffer.from(d).toString();
  });

  res.on('end', () => {
    console.log(toJSON(data)); // Converts to JSON here
  });

})

.on('error', err => {
  console.log(err);
})

.end();
