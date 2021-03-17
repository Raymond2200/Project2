let User = require('../model/user')
let Quote = require('../model/quote')
let fetch = require('node-fetch')
let Temp = require('../model/temp')
const Author = require('../model/author')

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
    console.log(Temp.tempQuotes)
    let test = Temp.tempQuotes[req.body.value]
    console.log(await Quote.findOne({quote: test}))
    // for (i of req.body){
    //     let test = await Quote.findOne({quote: Temp.tempQuotes[i.value].q})
    //     if (test === null) {
    //         test = await Author.findOne({author: Temp.tempQuotes[i.value].a})
    //     }
    // }
    res.send('test')
}