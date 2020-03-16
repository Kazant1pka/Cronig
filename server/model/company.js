const mongoose = require('mongoose');
const mongoolia = require('mongoolia').default;
const Schema = mongoose.Schema;

// create a schema
const companySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  summa: { type: Number, required: true },
  subject: { type: String, required: true },
  startDate: {type: Date, required: true},
  endDate: { type: Date, required: true },
  earned: { type: Number},
  tag: { type: Array },
  rating: { type: Array },
  bonus: { type: Object },
  status: { type: Number },
  images: {type: Array},
  creator: { type: String },
  comment: { type: Array },
  news: {type: Array},
  video: {type: String}
}, { collection: 'companies' });
const Company = mongoose.model('Company', companySchema);


module.exports = Company;
