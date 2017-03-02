import * as passport from 'passport';
import * as local from 'passport-local';
import * as mongoose from 'mongoose';
import User from '../models/user';

let LocalStrategy = local.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) {
      return done(err);
    } else if (!user) {
      return done(null, false, {message: 'incorrect username'});
    } else if (!user.validatePassword(password)) {
      return done(null, false, {message: 'invalid password'});
    }
    return done(null, user);  
  });
}));
