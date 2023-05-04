const express = require("express");

const { getAllStudents } = require("../controllers/studentControllers");

const router = express.Router();

router.get("/", getAllStudents);

module.exports = router;