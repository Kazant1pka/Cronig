const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title:{ type: String, required: true },
  text: { type: String, required: true },
  img: { type: String, required: true },
  date:{type: Date, required: true}
});

const News = mongoose.model('News', newsSchema);
module.exports = News;