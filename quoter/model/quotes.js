const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

mongoose.set('useCreateIndex', true);

const quoteSchema = new Schema({
    quote: String,
    score: Number,
    fakeauth: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
  }, {
    timestamps: true
});



mongoose.Promise = global.Promise;
quoteSchema.plugin(mongoose_fuzzy_searching, {fields: ['fakeauth']});
module.exports = mongoose.model('Quote',  quoteSchema);  
