import * as mongoose from 'mongoose';
import {Post} from './post';
import postSchema from './post';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt-nodejs';

interface User extends mongoose.Document {
  username: string;
  password: string;
  profilePicture: string;
  posts: Post[];
}

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  profilePicture: {
    type: String
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

userSchema.method('generateHash', function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});

userSchema.method('validatePassword', function(password) {
  return bcrypt.compareSync(password, this.password);
});

userSchema.method('generateToken', function() {
  return jwt.sign(
    {
      id: this._id,
      username: this.username
    },
    'SecretString'
  );
});

export default mongoose.model<User>('User', userSchema); //users collection
