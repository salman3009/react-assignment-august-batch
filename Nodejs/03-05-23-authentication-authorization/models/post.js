const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
     comment:{type:String,required:[true,'comment cannot be empty']},
     postedBy:{type:String,required:true,minlength:[4,'please provide atlest 4 characters'],maxlength:[200,"allowed range for password is 50"]},
},{timestamps:true})

module.exports = mongoose.model('post',postSchema);

