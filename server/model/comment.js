const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const commentSchema = new Schema({
  title: { type: String, required: true},
  senderId: { type: Number, required: true },
  senderName: { type: String, required: true },
  senderUrl: { type: String, required: true },
  createdAt: { type: Date, required: true },
  like: {type: Array},
  dislike: {type: Array}
}, { collection: 'comment' });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
