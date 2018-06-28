'use strict';

const valueOf = require('./valueOf.js');

let out = {};
let subject, predicate, object;

function toJSON(data) {

  data.match(/.+/gm).forEach(line => {

    subject    = valueOf('s', line);
    predicate  = valueOf('p', line);
    object     = valueOf('o', line);

    if (line.match('<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>')) {
      out[subject] = { '#type': object };
      return;
    }

    if (out[subject].hasOwnProperty(predicate)) {
      if (!Array.isArray(out[subject][predicate])) {
        out[subject][predicate] = [out[subject][predicate]];
      }
      out[subject][predicate] = [...out[subject][predicate], object];
    } else {
      out[subject][predicate] = object;
    }

  });

  console.log(JSON.stringify(out, null, 2));

}

module.exports = toJSON;
