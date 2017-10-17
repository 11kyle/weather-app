var express = require('express');
var router = express.Router();

var mid = require('../middleware');

const DarkSkyApi = require('dark-sky-api');

///////////////////////////////
//////////Site Routes//////////
///////////////////////////////
// GET /index
router.get('/', function(req, res, next) {
  res.render('index');
});

///////////////////////////////
///////////API Routes//////////
///////////////////////////////
// Create a Post
router.post("/api/weather", (req, res) => {
  console.log(req.body);

  // position of city
  const position = {
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  const excludesBlock = 'hourly,minutely,flags';

  // Weather api
  DarkSkyApi.apiKey = '8180a4c60a0e4f12e51f7b88b74be591';
  DarkSkyApi.proxy = true;

  /*
  // Current day
  DarkSkyApi.loadCurrent(position)
    .then((result) => {
      res.json(result);
    });

  // 7 day forecast
  DarkSkyApi.loadForecast(position)
    .then((result) => {
      res.json(result);
    });
    */

  // All days
  DarkSkyApi.loadItAll(excludesBlock, position)
    .then((result) => {
      res.json(result);
    });
});

module.exports = router;
