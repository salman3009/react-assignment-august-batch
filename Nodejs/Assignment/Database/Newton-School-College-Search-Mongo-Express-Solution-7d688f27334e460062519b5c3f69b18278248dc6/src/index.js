const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector');
const { connections } = require('mongoose');


app.get('/findColleges', async (req, res) => {
    let query = {}
    let name = req.query.name;
    let city = req.query.city;
    let state = req.query.state;
    let exam = req.query.exam;
    let course = req.query.course;
    let maxFees = req.query.maxFees;
    let minPackage = req.query.minPackage;
    if (name) {
        // query['name'] = { $regex: eval('/.*' + name + '.*/i') }
        let regex = new RegExp(`${name}`,'i');
        query['name'] = { $regex: regex}
    }

    if (city) {
        query['city'] = { $regex: eval('/.*' + city + '.*/i') }
    }

    if (state) {
        query['state'] = { $regex: eval('/.*' + state + '.*/i') }
    }
    if (exam) {
        query['exam'] = { $regex: eval('/.*' + exam + '.*/i') }
    }

    if (course) {
        query['course'] = { $regex: eval('/.*' + course + '.*/i') }
    }
    if (maxFees) {
        query['maxFees'] = { $lte: parseFloat(maxFees) }
    }
    if (minPackage) {
        query['minPackage'] = { $gte: parseFloat(minPackage) }
    }
    console.log(query)
    connection.find(query).then(e => {
        res.json(e)
    })
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;