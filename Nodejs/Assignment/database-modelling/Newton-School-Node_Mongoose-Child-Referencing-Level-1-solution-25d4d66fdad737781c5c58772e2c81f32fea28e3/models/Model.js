// Import Mongoose
const mongoose = require('mongoose');

// Subject Schema
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subjectCode: {
        type: String,
        required: true,
        unique: true
    }
});

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true,
        unique: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
});

// Create the models
const Subject = mongoose.model('Subject', subjectSchema);
const Student = mongoose.model('Student', studentSchema);

// Export the models
module.exports = { Subject, Student };