const mongoose = require('mongoose');

//Declaring properties and datatypes
const studentSchema = mongoose.Schema({
        studentName : {type:String,required:true},
        studentId:{type:String,required:true},
        branch:{type:String}
})

module.exports = mongoose.model('student',studentSchema);