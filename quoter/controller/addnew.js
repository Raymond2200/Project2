let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')
const Quote = require('../model/quotes')

module.exports = {
    addNewIndex,
    quoteCreate
}

async function addNewIndex(req, res) {
    res.render('addnew', {user: req.user})
}

async function quoteCreate(req,res) {
    let auth = await Author.findOne({author: req.body.a})
    if (auth === null) {
        try{
            let newAuthor = await Author.create({
                author: req.body.a,
            })
            let newQuote = await Quote.create({
                quote: req.body.q,
                score: 0,
                fakeauth: req.body.a,
                author: newAuthor
            })
            newAuthor.quotes.push(newQuote._id)
            await newAuthor.save()
        } catch(err) {
            return res.send('We seem to have encountered an issue')
        }
    }
    else{
        let test = await Quote.findOne({quote: req.body.q}) 
        if (test === null) {
            try {
                await Quote.create({
                    quote: req.body.q,
                    score: 0,
                    author: auth._id
                })
            } catch(err) {
                return res.send('We seem to have encountered an issue')
            }
        }
    }
    let using = await Quote.findOne({quote: req.body.q})
    if (req.user.quotes.some((f) => f === using)){}
    else{
        current = await User.findById(req.user._id)
        current.quotes.push(using._id)
        await current.save()
    }
    res.redirect('./myquotes')
}
