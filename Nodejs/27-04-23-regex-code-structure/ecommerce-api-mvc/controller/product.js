const Product = require('../models/product-model');

module.exports={

    getListController: async(req,res)=>{
      try{
        let skip = 0;
        let limit = 5;
        let query={};
        console.log(req.query);
        if(req.query.name){
          query.name = {$regex:req.query.name,$options:'i'};
        }
        if(req.query.skip){
          skip = Number(req.query.skip);
          skip = (skip*limit);
        }
        let result = await Product.find(query,{name:1,quantity:1,price:1,_id:0}).skip(skip).limit(limit);
        res.status(200).json({list:result});
      }catch(err){
        console.log(err);
        res.status(500).json({error:err});
      }  
    },

    postListController: async (req,res)=>{
      try{
         const productCreation = new Product({
          name : req.body.name,
          price:Number(req.body.price),
          quantity:Number(req.body.quantity)
         });
         let result = await productCreation.save();
        res.status(201).json({list:result});
      }catch(err){
        res.status(500).json({error:err});
      }
    }

}