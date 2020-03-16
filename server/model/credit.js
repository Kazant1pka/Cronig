const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const creditSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  sum: { type: String },
  details: { type: String },
  procent: { type: Number }
}, { collection: 'credit' });


const Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;