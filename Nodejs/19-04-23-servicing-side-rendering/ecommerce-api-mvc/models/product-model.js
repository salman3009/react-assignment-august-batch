const fs  = require('fs');

module.exports ={

    getListModel:()=>{
        console.log("model 5");
        let result = fs.readFileSync(`${__dirname}/data/product.json`);
        return JSON.parse(result);
    }
}