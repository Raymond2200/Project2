const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    author: String,
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Author',  authorSchema);