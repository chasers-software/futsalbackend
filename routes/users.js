const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/isAdmin");

const { getDashboard, getAllUsers,getUser } = require("../controllers/users");
router.get("/dashboard", getDashboard);
router.get("/", adminAuth, getAllUsers);
router.get("/profile/:id",getUser)

module.exports = router;
