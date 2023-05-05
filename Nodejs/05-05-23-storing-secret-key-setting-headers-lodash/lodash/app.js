const _=require('lodash');

let words = ['sky','wood','forest','ocean'];
//to find the first element in array
console.log(_.first(words));
//to find the last element in array
console.log(_.last(words));

let nums =[1,3,4,5,6,3,2,46,67];
//to find the index from 0
console.log(_.nth(nums,2));
//to find the index from last starting from -1
console.log(_.nth(nums,-2));


let numsChunk =[434,55,66,22,66,22,56,22];
//to divide into sub array depends upon the length given
console.log(_.chunk(numsChunk,2));
console.log(_.chunk(numsChunk,3));

let sumValue = [10,20,30,40,50];
console.log(_.sum(sumValue));

let filterValue = [20,10,34,23];
let result = _.filter(filterValue,(e)=>e>=18);
console.log(result);

let obj = {age:24,name:"rakesh",occupation:"teacher"};
console.log(_.keys(obj));
console.log(_.values(obj));


console.log(_.isNumber(33));
console.log(_.isString("details"));
console.log(_.isArray([33,44]));
console.log(_.isObject({fullName:"akash"}));