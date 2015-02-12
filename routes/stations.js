var express = require('express');
var router = express.Router();
var stations = require('../public/resources/stations.js');
var svtInterface = require('../modules/svtInterface.js');



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

        svtInterface.getDepartures(req.params.id, function(error, departures){
          console.log(departures);
          res.send(departures);
        });

});

module.exports = router;
