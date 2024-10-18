import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publish_at: {
    type: Date,
    default: Date.now,
  },
});

const Post =  mongoose.models.post || mongoose.model('post', postSchema);
export default Post;

