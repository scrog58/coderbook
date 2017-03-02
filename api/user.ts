import * as express from 'express';
import User from '../models/user';
import Post from '../models/post';
import passport = require('passport');
import * as jwt from 'jsonwebtoken';

let router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return next(err);
    } else if (user) {
      return res.json({ token: user.generateToken()})
    }
    return res.status(400).send(info);
  })(req, res, next);
});

router.post('/register', (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.generateHash(req.body.password);
  user.profilePicture = req.body.profilePicture;
  user.save()
    .then((newUser) => res.send('Successfully registered!'))
    .catch((err) => res.json(err));
});

//user profile page
router.get('/:id', verifyToken, (req, res) => {
  User.findOne({_id: req.params.id}).populate({
    path: 'posts',
    populate: {
      path: 'comments',
      model: 'Comment'
    }
  }).then(
    (foundUser) => {
      if(!foundUser) {
        res.send('sorry, no user found for the id: ' + req.params.id);
      } else {
        foundUser.password = '';
        res.json(foundUser);
      }
    }
  )
  .catch((err) => res.json(err));
});

//feed
router.get('/feed', (req, res) => {

});

function verifyToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'SecretString', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
}

export default router;
