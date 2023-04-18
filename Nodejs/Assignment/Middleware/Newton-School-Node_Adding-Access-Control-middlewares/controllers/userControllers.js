const fs = require("fs");

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

//Fetches all Users data
const getAllUsers = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Users Not Found",
            status: "Error",
            error: err,
        });
    }
};

//Fetches the user details with the given ID.
const getUserByID = (req, res) => {
    try {
        const user = users.find(obj => obj._id == req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User Not Found"
            });
        }
        return res.status(201).json({
            status: "success",
            data: {
                user: user
            }
        })

    } catch (err) {
        res.status(400).json({
            message: "User Fetching Failed",
            status: "Error",
            error: err,
        });
    }
};

// Creates a new User
const createUser = (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name Missing",
                status: "Error",
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Email Missing",
                status: "Error",
            });
        }

        const new_id = users[users.length - 1]._id + 1;
        const new_user = { _id: new_id, name, email };
        users.push(new_user);

        fs.writeFile(
            `${__dirname}/../data/users.json`,
            JSON.stringify(users),
            (err) => {
                res.status(201).json({
                    status: "success",
                    data: {
                        user: new_user,
                    },
                });
            }
        );
    } catch (err) {
        res.status(400).json({
            message: "User Creation failed",
            status: "Error",
        });
    }
};

// Updates user's details
const updateUser = (req, res) => {
    try {
        const { name, email } = req.body;
        for (var i in users) {
            if (users[i]._id == req.params.id) {
                users[i].name = name || users[i].name;
                users[i].email = email || users[i].email;

                fs.writeFile(
                    `${__dirname}/../data/users.json`,
                    JSON.stringify(users),
                    (err) => {
                        res.status(201).json({
                            status: "success",
                            data: {
                                users,
                            },
                        });
                    }
                );
                return;
            }
        }
        res.status(404).json({
            message: "User Not Found",
            status: "Error",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "User Updation Failed",
            status: "Error",
            error: err,
        });
    }
};

// Deletes the user with the given ID.
const deleteUser = (req, res) => {
    const object = users.find(obj => obj._id == req.params.id);
    if (!object) {
        return res.status(404).json({ status: "Error", message: "User not Found" });
    }
    const filteredUsers = users.filter((item) => item._id != req.params.id);
    fs.writeFile(
        `${__dirname}/../data/users.json`,
        JSON.stringify(filteredUsers),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    users: filteredUsers,
                },
            });
        }
    );
    return;
};

module.exports = { getAllUsers, getUserByID, createUser, updateUser, deleteUser };
