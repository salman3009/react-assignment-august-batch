const express = require('express');
const parser = require('body-parser');
const app = express();
app.use(parser.json());

const productList=[
    {
        id:1,
        name:"AC",
        price:2000,
        active:false
    }
];

app.get('',(req,res)=>{
    res.status(200).json({
        message:"Data fetched successful",
        data:productList
    })
});

app.post('',(req,res)=>{
    let list = req.body;
    console.log(req.query);
    list.id=productList.length+1;
    list.activate = true;
    productList.push(list);
    res.status(201).json({
        message:"Data added successful"
    })

})

const middelwareToCheckActivate=function(req,res,next){
    console.log("coming to middelware");
    let filterList = productList.filter((obj)=>{
        return obj.id == req.params.id;
    });
    if(filterList.length>0){
      let active = filterList[0].active;
      if(!active){
        res.status(404).json({
            message:"Data is no more"
        })
      }
      else{
        console.log("coming next");
        next();
      }
    }else{
        console.log("coming next");
        next();
    }
   
}

const middlewareForSearch = (req,res,next)=>{

    let list = productList.filter((obj)=>{
        return obj.active == true;
    })
    req.list = list;
    next();

}

app.get('/list/:id',middelwareToCheckActivate,(req,res)=>{
//route parameters/dynamic params
    let id = req.params.id;
    let list = productList.filter((obj)=>{
        return obj.id == id;
    })
     
    if(list.length>0){
        res.status(200).json({
            message:"Data fetched successful",
            data:list[0]
        })
    }
    else{
        res.status(404).json({
            message:"No match is found"
        }) 
    }
})

app.get('/search',middlewareForSearch,(req,res)=>{
     console.log(req.query.name);
     console.log(req.query.price);
     let list = req.list.filter((obj)=>{
        console.log(obj.name,typeof req.query.name);
        return (obj.name == req.query.name || obj.price == req.query.price)
     })

    res.status(200).json({
        message:"filtered data",
        data:list
    })
})

module.exports = app;