import * as express from 'express';
import User from '../models/user';
import Post from '../models/post';

let router = express.Router();

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then((foundUser) => {
      if(!foundUser) {
        res.send('incorrect username');
      } else if(foundUser.password === req.body.password) {
        res.send('success');
      } else {
        res.send('incorrect password');
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/register', (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.profilePicture = req.body.profilePicture;
  user.save()
    .then((newUser) => res.send('Successfully registered!'))
    .catch((err) => res.json(err));
});

//user profile page
router.get('/:id', (req, res) => {
  User.findOne({_id: req.params.id}).populate('posts').populate('comments').then(
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

export default router;
