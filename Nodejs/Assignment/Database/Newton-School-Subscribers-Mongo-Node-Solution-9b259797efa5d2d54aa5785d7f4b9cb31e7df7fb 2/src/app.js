const express = require('express');
const app = express()
const Subscriber = require('./models/subscribers')

const getSubscriber = async (req, res, next) =>{
    let subscriber;
    try{
        subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber)
            return res.status(404).json({message: 'cannot find subscriber'})
    }catch(err){
        return res.status(400).json({message: err.message})
    }
    res.subscriber = subscriber;
    next();
}

// Getting all
app.get('/subscribers', async (req, res) =>{
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch(err){
        res.status(500).json({message: err.message});
    }
})
// Getting all names
app.get('/subscribers/names', async (req, res) =>{
    try{
        const subscribers = await Subscriber.find({}, {"name": 1, "subscribedChannel": 1, "_id":0});
        res.json(subscribers);
    } catch(err){
        res.status(500).json({message: err.message});
    }
})
// Getting One
app.get('/subscribers/:id',getSubscriber, (req, res) =>{
    res.json(res.subscriber);
})


module.exports = app;
