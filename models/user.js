var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bcrypt = require('bcrypt');

const saltRounds = 10;

// User Schema
var UserSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true, // makes sure each email is unigue
      required: true
    },
    password: {
      type: String,
      required: true
    }
}, {collection: 'users'});

// UserSchema methods
UserSchema.methods.validPassword = function(password) {
  // Load hash from your password DB.
  return bcrypt.compareSync(password, this.password);
};

// User Model
var User = mongoose.model("User", UserSchema);

// passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
	  // Error
      if (err) {
        return done(err);
      }
      // User Not found
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // User found but incorrect password
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = User;
