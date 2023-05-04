const express = require("express");

const { getAllStudents, getStudentSubjects, addSubjectToStudent } = require("../controllers/studentControllers");

const router = express.Router();

router.get("/", getAllStudents);
router.get("/subjects", getStudentSubjects);
router.patch("/add-subject", addSubjectToStudent);

module.exports = router;