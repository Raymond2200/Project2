const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quoteSchema = new Schema({
    quote: String,
    score: Number,
    fakeauth: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Quote',  quoteSchema);  
