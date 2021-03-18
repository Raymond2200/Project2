const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quoteSchema = new Schema({
    quote: String,
    rating: Number
  }, {
    timestamps: true
  });
  
  const authorSchema = new Schema({
    author: String,
    quotes: [quoteSchema]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Author',  authorSchema);