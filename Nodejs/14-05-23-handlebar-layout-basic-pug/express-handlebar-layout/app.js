const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs',exphbs({
    defaultLayout:'index',
    extname:'.hbs'
}));

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/people',(req,res)=>{
    res.render('people');
})



app.listen(3000,()=>{
    console.log("server is listening on 3000");
})