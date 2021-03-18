let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')
const user = require('../model/user')
const List = require('../model/lists')

module.exports={
    quoIndex,
}

async function quoIndex(req, res) {
    let loop = -1
    await User.findById(req.user.id).populate('quotes').exec((err, quotes) => {
        res.render('./myquotes/index', {user: req.user, quote: quotes.quotes, loop: loop })
    })
}