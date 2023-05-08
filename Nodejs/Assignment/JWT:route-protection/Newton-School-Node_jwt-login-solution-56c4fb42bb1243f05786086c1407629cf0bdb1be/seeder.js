const fs = require("fs");
const User = require('./models/User');

const users_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/users.json`));

async function seedWithDummyData() {
    try {
        // CLEAR DB
        await User.deleteMany({});

        for (let user of users_list) {
            await User.create(user);
        }

        console.log(`users seeded successfully`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData