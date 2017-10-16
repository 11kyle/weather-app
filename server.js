var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');

var app = express();

app.set('port', (process.env.PORT || 3000));

// Parse incoming content
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'I love New York',
    resave: true,
    saveUninitialized: false // read the readme on express-session
}));

// GET /all static content
app.use(express.static(__dirname + '/public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// Listen on port 3000
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
