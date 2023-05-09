const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:[32,"maxlength is 32"]
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports = model("user",UserSchema);