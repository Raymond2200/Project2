let User = require('../model/user')
let fetch = require('node-fetch')
const Quote = require('../model/quotes')
let Temp = require('../model/temp')

module.exports = {
    index,
    search,
    addSearch,
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

async function search(req, res) {
  let incoming = req.body.search
  let found = await Quote.fuzzySearch(incoming);
  Temp.tempQuotes = found
  loop=-1
  res.render('show', {user: req.user, quote: found })
}

async function addSearch(req, res) {
  let arrs = Object.values(req.body)
  for (i of arrs){
    let using = await Quote.findById(Temp.tempQuotes[i]._id)
    if (req.user.quotes.some((f) => f === using._id)){}
    else{
        current = await User.findById(req.user._id)
        current.quotes.push(using._id)
        await current.save()
    }
  }
  res.redirect('./myquotes/index')
}