const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/isAdmin");

const { getDashboard, getAllUsers } = require("../controllers/users");
router.get("/dashboard", getDashboard);
router.get("/", adminAuth, getAllUsers);

module.exports = router;
