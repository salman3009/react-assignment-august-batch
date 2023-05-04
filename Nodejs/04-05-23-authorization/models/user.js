const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     email:{type:String,required:[true,'email cannot be empty'],unique:[true,"email already exists"]},
     password:{type:String,required:true,minlength:[4,'please provide atlest 4 characters'],maxlength:[200,"allowed range for password is 50"]},
     roles:{type:[String],required:true,enum:['admin','employee','superadmin'],default:'employee'},
     age:{type:Number,required:true,min:[18,'Age must be 18 or above'],max:[50,"age mbust be less then 50"]}
},{timestamps:true})

module.exports = mongoose.model('user',userSchema);

