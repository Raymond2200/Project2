let User = require('../model/user')
let fetch = require('node-fetch')

module.exports = {
    index,
}

async function index(req, res, next) {
  let response = await fetch('https://zenquotes.io/api/quotes')
  let body = await response.json()
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
        quote: body[0],
        sortKey
      });
  });
}

