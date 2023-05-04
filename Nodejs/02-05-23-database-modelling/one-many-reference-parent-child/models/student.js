const mongoose = require('mongoose');


const studentSchema = mongoose.Schema({
        studentName : {type:String,required:true},
        studentId:{type:String,required:true},
        branch:{type:String},
        addressIds:[]
})

module.exports = mongoose.model('student',studentSchema);