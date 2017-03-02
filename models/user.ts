import * as mongoose from 'mongoose';
import {Post} from './post';
import postSchema from './post';

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

export default mongoose.model<User>('User', userSchema); //users collection
