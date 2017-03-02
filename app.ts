import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';

import User from './models/user';
import Post from './models/post';
import Comment from './models/comment';
import users from './api/user';

require("./models/user");
require("./config/passport");

const CONNECTION_STRING = 'mongodb://nick:98765@ds161159.mlab.com:61159/sampledb_ns'
const profilePicture = 'http://www.clipartkid.com/images/87/profile-silhouette-Gfiv7m-clipart.png';

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log('connection established.')
    Comment.create({
      profilePicture: profilePicture,
      content: 'comment 1 of 2',
      dateCreated: '03022017'
    },
    {
      profilePicture: profilePicture,
      content: 'comment 2 of 2',
      dateCreated: '03022017'
    }).then((comment1, comment2) => {
      Post.create({
        profilePicture: profilePicture,
        content: 'our post',
        dateCreated: '03022017',
        comments: [comment1, comment2]
      }).then((post) => {
        let myUser = new User();
        myUser.username = 'Nick';
        myUser.generateHash('98765');
        myUser.profilePicture = profilePicture;
        myUser.posts.push(post);
        myUser.save();
      })
    })
  })
  .catch((err) => {
    console.log(err);
  });

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));


app.use('/api/users', users);


// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
