var express = require('express');
var router = express.Router();
var stations = require('../public/resources/stations.js');
var request = require('request');
var cheerio = require('cheerio');


/* GET stations listing. */
router.get('/', function(req, res) {
  res.send(stations);
});
router.get('/:id', function(req, res) {
  for(var i = 0; i < stations.length;i++){
    if(stations[i].id == req.params.id){
      res.send(stations[i]);
    }
  }

});
/* GET departure information on a station */
router.get('/:id/departures', function(req, res) {
  for(var i = 0; i < stations.length;i++){
    if(stations[i].id == req.params.id){
      request('http://www.swtue.de/abfahrt/?halt=' + req.params.id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var departures = []
          console.log(body);
          $ = cheerio.load(body);

          for(var i = 0; i < $('td[class=linie]').length;i++) {
            var connection = {};
            connection.line = $('td[class=linie]')[i].children[0].data.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g,"");
            connection.direction = $('td[class=richtung]')[i].children[0].data.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g,"");
            var depart = $('td[class=abfahrt]')[i].children[0].data.replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g,"");
            var hsplit  = depart.indexOf("h");
            if(hsplit > -1){
              connection.departure = depart.slice(0,hsplit + 1) + " " + depart.slice(hsplit + 1);
            }
            else {
              connection.departure = depart;
            }
            departures.push(connection);
          }
          res.send(departures);
        }
      })


    }
  }

});

module.exports = router;
