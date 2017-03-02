import * as mongoose from 'mongoose';

export interface Comment extends mongoose.Document {
  profilePicture: string;
  content: string;
  dateCreated: string;
}

let commentSchema = new mongoose.Schema({
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
  }
});

export default mongoose.model<Comment>('Comment', commentSchema);
