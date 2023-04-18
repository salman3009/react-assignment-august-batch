const express = require('express');
const app = express();


//Router Middlewares
app.use(express.json());
app.get('/api/get-next-num', (req, res) => {
    let { num } = req.body;
    res.send({ message: num + 1, status: 'success' });
});

module.exports = app;
