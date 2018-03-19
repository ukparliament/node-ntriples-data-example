const https         = require("follow-redirects").https;
const { jsonifyN3 } = require("./jsonifyN3");

// Request N3
//
// @note: This needs improvement. I will get back to it.
exports.requestN3 = function(res, host, path, res_type, file = "index") {
  https.request(
    {
      host: host,
      path: "/" + path,
      method: "GET",
      headers: {
        accept: "application/n-triples"
      }
    },
    function(response){

      let data = "";

      response.on("data", function(d) {
        data += d;
      });

      response.on("end", function() {
        let partiesData = jsonifyN3(data);
        if (res_type === "send") {
          res.send(partiesData);
        } else {
          res.render(file, { parties: partiesData });
        }
      });

      response.on("error", function(error){
        res.render("error", {
          error: error
        });
      });

    }
  ).end();
};
