const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs',exphbs({
    defaultLayout:'index',
    extname:'.hbs'
}));

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('home',{msg:"welcome to template engine"});
})

app.get('/people',(req,res)=>{
    res.render('people',{list:[
        {name:"akash"},{name:"amol"}
    ]});
})



app.listen(3002,()=>{
    console.log("server is listening on 3000");
})