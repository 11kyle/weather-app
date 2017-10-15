var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Blog = require('../models/blog');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mid = require('../middleware');

const DarkSkyApi = require('dark-sky-api');

///////////////////////////////
//////////Site Routes//////////
///////////////////////////////
// GET /
router.get('/', function(req, res, next) {
  res.render('index');
});
// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  res.render('login');
});
// POST /login
router.post('/login',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// GET /admin
router.get('/admin', mid.isAuthenticated, function(req, res, next) {
  res.render('admin');
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/'); // return to home page
      }
    });
  }
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
  // Geocode an address.
  googleMapsClient.geocode({
    address: req.body.name
  }, function(err, response) {
    if (!err) {

      position.latitude = response.json.results[0].geometry.location.lat;
      position.longitude = response.json.results[0].geometry.location.lng;
      console.log(position);

      // Weather api
      DarkSkyApi.apiKey = '8180a4c60a0e4f12e51f7b88b74be591';
      DarkSkyApi.proxy = true;

      // Response Units
      const responseUnits = DarkSkyApi.getResponseUnits();

      DarkSkyApi.loadCurrent(position)
        //.then(result => console.log(result));
        .then((data) => {
          console.log(`Currently, ${data.summary}`);
          console.log(`The temperature is ${data.temperature} degrees ${responseUnits.temperature}`);
          console.log(`The wind speed is ${data.windSpeed} ${responseUnits.windSpeed}`);
          res.json(data);
        });
    }
  });
  //res.sendStatus(200);
});

// Get weather
router.get("api/getWeather", (req, res) => {

});






// Get all Posts
router.get("/api/blogpost", (req, res) => {
  Blog.find({}, (err, docs) => {
    if (docs) {
      res.json(docs);
    } else if (err) {
      res.sendStatus(400);
    }
  });
});






module.exports = router;
