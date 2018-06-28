'use strict';

const FILE = 'https://api.parliament.uk/Live/fixed-query/person_by_id?person_id=TyNGhslR';

const https = require('https');
const toJSON = require('./assets/javascripts/toJSON');

https.get(FILE, res => {

  res.on('data', data => {


    // @NOTE: This currently breaks because when the function filters a
    // statement on each line, some of the N-Triples seem to create a line-break
    // before a statement ends.
    //
    // Ideally it would be better if the format of the data gets amended in its
    // original source but assuming that that might not be something that can
    // currently be done, I will come back to see if I can write a script that
    // fixes this.
    toJSON(Buffer.from(data).toString()); // Converts to JSON here

  });

})

.on('error', err => {
  console.log(err);
})

.end();
