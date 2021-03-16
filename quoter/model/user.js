const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    avatar: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);