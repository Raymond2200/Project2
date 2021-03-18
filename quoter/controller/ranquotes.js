let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')
const Quote = require('../model/quotes')

module.exports={
    indexran,
    createQuote,
}

async function indexran(req, res) {
    let response = await fetch("https://zenquotes.io/api/quotes")
    let body = await response.json()
    let loop = -1
    Temp.tempQuotes = body
    res.render('ranquotes', {user : req.user, quote: body, loop: loop})
}

async function createQuote(req, res) {
    let arrs = Object.values(req.body)
    for ( i of arrs) {
        console.log(Author.findOne({quotes: {quote: Temp.tempQuotes[i].q}}))
        let auth = await Author.findOne({author: Temp.tempQuotes[i].a})
        let using = await Quote.findOne({quote: Temp.tempQuotes[i].q})._id
        console.log(auth)
        if (auth === null) {
            try{
                let newAuthor = await Author.create({
                    author: Temp.tempQuotes[i].a,
                })
                let newQuote = await Quote.create({
                    quote: Temp.tempQuotes[i].q,
                    score: 0,
                    fakeauth: Temp.tempQuotes[i].a,
                    author: newAuthor
                })
                newAuthor.quotes.push(newQuote._id)
                await newAuthor.save()
            } catch(err) {
                return res.send('We seem to have encountered an issue')
            }
        }
        else{
            let test = await Quote.findOne({quote: Temp.tempQuotes[i].q}) 
            if (test === null) {
                try {
                    await Quote.create({
                        quote: Temp.tempQuotes[i].q,
                        score: 0,
                        author: auth._id
                    })
                } catch(err) {
                    return res.send('We seem to have encountered an issue')
                }
            }
        }
        if (req.user.quotes.some((f) => f === using) )
        let current = await User.findById(req.user._id)
        current.quotes.push(using)
        await current.save()
    }
        res.redirect('./myquotes')
}