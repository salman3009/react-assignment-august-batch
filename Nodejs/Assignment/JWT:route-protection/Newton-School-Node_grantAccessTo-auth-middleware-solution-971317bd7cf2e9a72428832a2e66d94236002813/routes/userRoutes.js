const express = require("express");

const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userControllers");

const grantAccessTo = require("../middlewares/grantAccessTo");

const router = express.Router();

/*
router.get("/"): Should be accessible to roles user, admin, and superadmin. This route is used to retrieve all users.
router.get("/:id"): Should be accessible to roles user, admin, and superadmin. This route is used to retrieve a user by their ID.
router.post("/"): Should be accessible to roles guest, user, admin, and superadmin. This route is used to create a new user.
router.patch("/:id"): Should be accessible to roles admin and superadmin. This route is used to update an existing user.
router.delete("/:id"): Should be accessible to role superadmin only. This route is used to delete an existing user.
*/
router.get("/", grantAccessTo(["user", "admin", "superadmin"]), getAllUsers);
router.get("/:id", grantAccessTo(["user", "admin", "superadmin"]), getUserByID);
router.post("/", grantAccessTo(["guest", "user", "admin", "superadmin"]), createUser);
router.patch("/:id", grantAccessTo(['admin', 'superadmin']), updateUser);
router.delete("/:id", grantAccessTo(['superadmin']), deleteUser);

module.exports = router;