const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    name: String,
    description: String,
    user: {type: String, by: mongoose.Schema.Types.ObjectId, ref: 'User'},
    quotes: [{type: String, by: mongoose.Schema.Types.ObjectId, ref: 'Quote'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('List', listSchema);