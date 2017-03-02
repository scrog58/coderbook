import * as mongoose from 'mongoose';
import {Comment} from './comment';
import commentSchema from './comment';

export interface Post extends mongoose.Document {
  profilePicture: string;
  content: string;
  dateCreated: string;
  comments: Comment[];
}

let postSchema = new mongoose.Schema({
  profilePicture: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String,
    required: true
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

export default mongoose.model<Post>('Post', postSchema);
