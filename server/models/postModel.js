const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, ' a post must have a title'],
    enum: ['tech', 'food', 'life', 'cryptos', 'music', 'stocks']
  },
  photo: {
    type: String,
    default: '',
  },
  summary: {
    type: String,
    required: [true, 'a post should have summary'],
  },
  description: {
    type: String,
    required: [true, 'A post must have post details'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: new Date().toDateString(),
  },
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username profilePic',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
