const productModel = require('../models/product-model');

module.exports={

    getListController:(req,res)=>{
      console.log("inside the product controller 4",req.token);
      let result = productModel.getListModel();
      res.status(200).send(`<ul>
      <li>Pen</li>
      <li>Pencil</li>
      <li>sharpner</li>
      </ul>`)
    }

}