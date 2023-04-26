const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { newsArticleModel } = require('./connector')

console.log('started the server')


app.get('/newFeeds', async (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    console.log(limit, offset)
    if (limit !== undefined && !isNaN(limit) && offset !== undefined && !isNaN(offset))

        await newsArticleModel.find({}).skip(parseInt(offset)).limit(parseInt(limit)).then(e => {
            // console.log(e)
            return res.send(e)
        })
    else if (limit !== undefined && !isNaN(limit)) {
        await newsArticleModel.find({}).limit(parseInt(limit)).then(e => {
            // console.log(e)
            return res.send(e)
        })
    } else if (offset !== undefined && !isNaN(offset)) {
        await newsArticleModel.find({}).skip(parseInt(offset)).limit(10).then(e => {
            // console.log(e)
            return res.send(e)
        })
    }
    else
        await newsArticleModel.find({}).limit(10).then(e => {
            // console.log(e)
            return res.send(e)
        })




})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;