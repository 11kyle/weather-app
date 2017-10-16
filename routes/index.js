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
  console.log(req.body.name);

  // Google Geocode
  var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBIsvnDnCKd2r5f5CWeOTM34fLj8uoKvfc'
  });

  // position of city
  const position = {
    latitude: 0,
    longitude: 0
  };
  const excludesBlock = 'hourly,minutely,flags';
  // Geocode an address.
  googleMapsClient.geocode({
    address: req.body.name
  }, function(err, response) {
    if (!err) {

      position.latitude = response.json.results[0].geometry.location.lat;
      position.longitude = response.json.results[0].geometry.location.lng;

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
    }
  });
});

module.exports = router;
