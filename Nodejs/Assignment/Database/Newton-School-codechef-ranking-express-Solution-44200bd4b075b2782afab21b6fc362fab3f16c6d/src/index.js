const express = require('express')
const app = express()

const { data } = require('./data')
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get('/topRankings', (req, res) => {
    var offset = req.query.offset;
    var limit = req.query.limit;
    if (isNaN(offset)) { offset = 0; }
    if (isNaN(limit)) { limit = 20; }
    offset = parseInt(offset)
    limit = parseInt(limit)
    res.json(data.slice(offset, offset + limit))
})
//20
//5,25
app.use('/', (req, res) => {
    res.status(404).send()
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;