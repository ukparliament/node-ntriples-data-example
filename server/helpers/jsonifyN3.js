// Convert N-Triples to JSON
//
// @note: This is only a demo function built for the
// parties data we are pulling into this app. I will
// improve this later to convert any N-Triples file
// to JSON
exports.jsonifyN3 = function(n3_data) {

  // Creating an array by filtering all values from the
  // N-Triples
  let partyArray = n3_data.split(/"/g).filter(function(d, i) {

    // Telling the loop to only return every second item
    // in this array, which are the values
    if (i % 2 === 1) {

      // There are some date strings, which I'm telling
      // this loop to not return by checking if string in
      // current loop contains '-', '+' and ':'
      //
      // @note: This needs improvement; I will get back
      // to it
      if (
        d.indexOf("-") >= 0 &&
        d.indexOf("+") >= 0 &&
        d.indexOf(":") >= 0
      ) {} else {
        return d;
      }
    }
  });

  // Creating the JSON
  let partiesJSON = [];

  for (let i = 1; i < partyArray.length; i += 2) {
    let p = {};
    p.partyName  = partyArray[i - 1];
    p.partyCount = +partyArray[i];
    partiesJSON.push(p);
  }

  return partiesJSON;

};
