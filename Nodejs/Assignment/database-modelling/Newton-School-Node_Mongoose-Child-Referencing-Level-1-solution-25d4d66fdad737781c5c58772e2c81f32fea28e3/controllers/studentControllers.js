const {Student} = require('../models/Model');

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

module.exports = { getAllStudents };

