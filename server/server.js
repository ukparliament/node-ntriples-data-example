/****
 ** NODE N-TRIPLES DATA EXAMPLE
 **/

const express       = require("express");
const { requestN3 } = require("./helpers/helpers");
const port          = process.env.PORT || 8080;

let   App           = express();

/**
 * REST API
 */

App.get("/mps", function(req, res) {
  requestN3(res, "beta.parliament.uk", "mps", "send");
});

/**
 * VIEWS
 */

App.set("views", "./views");
App.set("view engine", "pug");

App.get("/", function(req, res) {
  requestN3(res, "beta.parliament.uk", "mps");
});

App.listen(port, function() {
  console.log("Listening on port " + port);
});
