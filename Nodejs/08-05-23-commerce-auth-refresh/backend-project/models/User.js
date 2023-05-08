const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:[32,"maxlength is 32"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = model("user",UserSchema);