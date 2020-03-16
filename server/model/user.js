const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  fath: { type: String, required: true },
  family: { type: String, required: true },
  description: { type: String, required: true },
  marry: { type: String, required: true },
  child: { type: String, required: true },
  work: { type: String, required: true },
  photoUrl: { type: String },
  status: { type: String },
  credit: { type: Number },
  reqcredit: { type: Number }
}, { collection: 'users' });


const User = mongoose.model('User', userSchema);

module.exports = User;