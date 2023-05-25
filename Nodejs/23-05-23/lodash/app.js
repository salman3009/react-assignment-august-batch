const _ = require('lodash');

let array =[34,55,66,67];

let result = _.findIndex(array,(el)=>{
   return el == 55;
})

console.log(result);
console.log(_.first(array));

let str = "  newton school  ";

console.log(_.trim(str));