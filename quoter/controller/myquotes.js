let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')
const user = require('../model/user')
const List = require('../model/lists')

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
        mark = User.findOne({"quotes._id": Temp.currentList[i]})
        console.log(mark.quotes)
        mark.quotes(Temp.currentList[i]).remove()
        await User.save()
    }
    res.redirect('/myquotes')
}