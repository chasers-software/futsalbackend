const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authentication");
const adminAuth = require("../middleware/isAdmin");

const {
  getAllFutsal,
  getFutsal,
  verifyFutsal,
} = require("../controllers/futsal");

router.get("/", getAllFutsal);
router.get("/:id", getFutsal);
router.patch("/verify/:id", authenticateUser, adminAuth, verifyFutsal);

module.exports = router;
