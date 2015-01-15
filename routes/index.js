var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send({"This is the AbfahrtAPI" : "0.1.0"});
});

module.exports = router;
