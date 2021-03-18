let User = require('../model/user')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')
const user = require('../model/user')

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
        console.log(i)
        auth = await Author.findOne({author: Temp.tempQuotes[i].a})
        if (auth === null) {
            try{
                await Author.create({
                    author: Temp.tempQuotes[i].a,
                    quotes: {
                        quote: Temp.tempQuotes[i].q,
                        score: 0
                    }
                })
            } catch(err) {
                console.log(err)
                return res.send('We seem to have encountered an issue')
            }
            test = await Author.findOne({quotes: {quote: Temp.tempQuotes[i].q}})
            if (test === null) {
            }
            else {
                let quo = {
                    quote: TempQuotes[i].q,
                    score: 0
                }
                auth.quotes.push(quo)
                await auth.save()
            }
        }
        using = await Author.findOne({quotes: Temp.tempQuotes[i].a})
        current = await User.findById(req.user._id).quotes.push(using._id)
        current.quotes.push(using._id)
        await current.save()
    }
        res.send('test')
}