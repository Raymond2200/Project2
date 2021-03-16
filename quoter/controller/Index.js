let User = require('../model/user')


module.exports = {
    index
}

function index(req, res, next) {
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    if (err) return next(err);
    res.render('index', {
        users,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
  }