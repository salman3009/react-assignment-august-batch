
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { connection } = require('./connector')
// write you code here
app.get('/totalRecovered', async (req, res) =>{
    const data = await connection.aggregate([
        { $match:{}},
        { $group:{_id: null, totalRecovered: {$sum: "$recovered"}}},
        { $project: { _id: 0, totalRecovered: 1 } }
    ])
    res.json({data: {_id: "total", recovered: data[0].totalRecovered}});
})
app.get('/totalActive', async (req, res) =>{
    const data = await connection.aggregate([
        { $match:{}},
        { $group:{_id: null, totalActive: {$sum: {$subtract: ["$infected","$recovered"]}}}},
        { $project: { _id: 0, totalActive: 1 } }
    ])
    res.json({data: {_id: "total", active: data[0].totalActive}});
})

app.get('/totalDeath', async (req, res) =>{
    const data = await connection.aggregate([
        { $match:{}},
        { $group:{_id: null, totalDeath: {$sum: "$death"}}},
        { $project: { _id: 0, totalDeath: 1 } }
    ])
    res.json({data: {_id: "total", death: data[0].totalDeath}});
})

app.get('/hotspotStates', async (req, res) =>{
  const data = await connection.aggregate([
      { $addFields:{rate: {$round: [{$divide:[ {$subtract:["$infected", "$recovered"]},"$infected"]}, 5]}} },
      { $match: {rate: {$gt: 0.1}} },
      { $project: { state: 1, rate: 1, _id:0 } }
  ]) 
  res.json({data:data});
})

app.get('/healthyStates', async (req, res) =>{
    const data = await connection.aggregate([
        { $addFields:{mortality: {$round: [{$divide:[ "$death","$infected"]}, 5]}} },
        { $match: {mortality: {$lt: 0.005}} },
        { $project: { state: 1, mortality: 1, _id:0 } }
    ]) 
    res.json({data: data});
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
