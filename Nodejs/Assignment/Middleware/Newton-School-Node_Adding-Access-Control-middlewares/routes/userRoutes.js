const express = require("express");


// Importing the controller functions.
const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");

//Import the required middlware here.
const { grantAccessTo } = require('../middlewares/grantAccessTo');

const router = express.Router();

/*
Add access control middleware to the existing GET, POST and DELETE routes, as follows: 
- The getAllUsers route should be accessible to users, admins and superadmins.
- The createUser route should only be accessible to admins and superadmins.
- The getUserByID route should be accessible to user, admins and superadmins.
- The deleteUser route should be accessible to superadmins only.

possible roles : ['guest', 'user', 'admin', 'superadmin']
*/

// Add the middleware here
router.get("/", grantAccessTo(['user', 'admin', 'superadmin']), getAllUsers);
router.post("/", grantAccessTo(['admin', 'superadmin']), createUser);
router.get("/:id", grantAccessTo(['user', 'admin', 'superadmin']), getUserByID);
router.patch("/:id", updateUser);
router.delete("/:id", grantAccessTo(['superadmin']), deleteUser);

module.exports = router;
