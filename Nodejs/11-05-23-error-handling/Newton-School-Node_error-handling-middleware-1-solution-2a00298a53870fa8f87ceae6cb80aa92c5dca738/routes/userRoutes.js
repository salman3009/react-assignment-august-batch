const express = require("express");

const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    getCurrentUser,
} = require("../controllers/userControllers");

const grantAccessTo = require("../middlewares/grantAccessTo");
const protectUserRoutes = require("../middlewares/protectRouteUser");
const protectAdminRoutes = require("../middlewares/protectRouteAdmin");

const router = express.Router();

router.get("/me", grantAccessTo(["user", "admin", "superadmin"]), getCurrentUser);

//Add user route protection to these GET and PATCH routes: 
router.get("/:id", protectUserRoutes, grantAccessTo(["user", "admin", "superadmin"]), getUserByID);
router.patch("/:id", protectUserRoutes, grantAccessTo(["user", "admin", "superadmin"]), updateUser);

router.post("/", grantAccessTo(["guest", "user", "admin", "superadmin"]), createUser);

// Add a middleware to protect admin routes
router.get("/", protectAdminRoutes ,grantAccessTo(["admin", "superadmin"]), getAllUsers);
router.delete("/:id", protectAdminRoutes, grantAccessTo(['superadmin']), deleteUser);

module.exports = router;