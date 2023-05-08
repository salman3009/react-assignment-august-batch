const express = require("express");

const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userControllers");

const { grantAccessTo } = require('../middlewares/grantAccessTo');

const router = express.Router();

router.post("/",  createUser);
router.get("/:id", getUserByID);
router.patch("/:id", updateUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;