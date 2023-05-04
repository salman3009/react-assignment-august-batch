const fs = require("fs");
const {Subject, Student} = require("./models/Model");
const subjects_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/subjects.json`));
const students_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/students.json`));

async function seedWithDummyData() {
    try {
        // CLEAR DB
        await Subject.deleteMany({});
        await Student.deleteMany({});

        const createdStudents = await Student.insertMany(students_list);
        const createdSubjects = await Subject.insertMany(subjects_list);

        console.log(`${createdStudents.length} Students and ${createdSubjects.length} Subjects created.`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData