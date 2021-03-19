let User = require('../model/user')
let fetch = require('node-fetch')
const Quote = require('../model/quotes')

module.exports = {
    index,
    search,
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

async function search(req,res) {
  let incoming = req.body.search
  let found = await Quote.fuzzySearch(incoming);
  loop=-1
  res.render('show', {user: req.user, quote: found })
}