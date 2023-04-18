const productModel = require('../models/product-model');

module.exports={

    getListController:(req,res)=>{
      console.log("inside the product controller 4");
      let result = productModel.getListModel();
      res.status(200).json({
        data:result
      })
    }

}