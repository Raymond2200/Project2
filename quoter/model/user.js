const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    quotes: {type: Array, by: mongoose.Schema.Types.ObjectId, ref: 'Quote'},
    lists: {type: Array, by: mongoose.Schema.Types.ObjectId, ref: 'List'},
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);