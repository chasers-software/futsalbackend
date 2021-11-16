const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/isAdmin");

const {
  getDashboard,
  getAllUsers,
  getUser,
  editProfile,
  changePassword,
} = require("../controllers/users");
router.get("/dashboard", getDashboard);
router.get("/", adminAuth, getAllUsers);
router.get("/profile/:id", getUser);

router.patch("/editProfile/:id", editProfile);
router.patch("/changePassword/:id", changePassword);

module.exports = router;
