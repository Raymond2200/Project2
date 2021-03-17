const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema ({
    user: {type: String, by: mongoose.Schema.Types.ObjectId, ref: 'User'},
    author: {type: String, by: mongoose.Schema.Types.ObjectId, ref: 'Author'},
    quote: String,
    score: Number,
}, {
    timestamp: true
});

module.exports = mongoose.model('Quote', quoteSchema);