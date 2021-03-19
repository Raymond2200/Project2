const Schema = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };
  
  mongoose.Promise = global.Promise;
  return mongoose.connect(URL, options);