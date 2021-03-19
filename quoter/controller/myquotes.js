let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')


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
        let quote = Temp.currentList[i]
        test = req.user.id
        let mark = await User.findById(test)
        await mark.quotes.remove(quote._id)
        await mark.save()
    }
    res.redirect('/myquotes')
}