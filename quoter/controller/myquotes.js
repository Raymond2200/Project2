let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')
const user = require('../model/user')
<<<<<<< HEAD
=======

>>>>>>> 12de2d1b856e0247bb8f9d36ec76cef9835d23f7

module.exports={
    quoIndex,
    quoRemove
}

async function quoIndex(req, res) {
    let loop = -1
    Temp.currentList = []
    for (i of req.user.quotes){
        Temp.currentList.push(i._id)
    }
    await User.findById(req.user.id).populate('quotes').exec((err, quotes) => {
        res.render('./myquotes/index', {user: req.user, quote: quotes.quotes, loop: loop })
    })
}

async function quoRemove(req, res) {
    let arrs = Object.values(req.body)
    for (i of arrs) {
        let mark = User.findById(req.user._id)
        await mark.remove({quotes: Temp.currentList[i]})
    }
    res.redirect('/myquotes')
}