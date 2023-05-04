const { Student, Subject } = require('../models/Model');

const getAllStudents = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const students = await Student.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Student.countDocuments(Student.find());
        res.status(200).json({
            status: "success",
            data: {
                count,
                students,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Students Not Found",
            status: "Error",
            error: err,
        });
    }
};

const addSubjectToStudent = async (req, res) => {
    const { roll, subjectCode } = req.body;

    try {
        const student = await Student.findOne({ roll });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const subject = await Subject.findOne({ subjectCode });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        if (student.subjects.includes(subject._id)) {
            return res.status(409).json({ message: 'Subject already enrolled' });
        }
        student.subjects.push(subject._id);
        await student.save();
        res.status(200).json({ message: 'Subject added to student successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Unable to Fetch Data' });
    }
}

const getStudentSubjects = async (req, res) => {
    const { roll } = req.body;
    try {
        const student = await Student.findOne({ roll }).populate('subjects');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ subjects: student.subjects });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Unable to Fetch Data' });
    }
}


module.exports = { getAllStudents, addSubjectToStudent, getStudentSubjects };

