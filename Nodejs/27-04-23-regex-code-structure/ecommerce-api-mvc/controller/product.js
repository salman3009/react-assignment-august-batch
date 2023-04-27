const Product = require('../models/product-model');

module.exports={

    getListController: async(req,res)=>{
      try{
        let result = await Product.find();
        res.status(200).json({list:result});
      }catch(err){
        res.status(500).json({error:err});
      }  
    }

}