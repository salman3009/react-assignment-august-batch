const Product = require('../models/product-model');

module.exports={

    getListController: async(req,res)=>{
      try{
        let result = await Product.find();
        res.status(200).json({list:result});
      }catch(err){
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