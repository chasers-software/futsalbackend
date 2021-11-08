const adminAuth = require("../middleware/isAdmin");
const authenticateUser = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

const {
  getAllOperators,
  getAllFutsal,
  verifyFutsal,
} = require("../controllers/admin.controller");

router.get("/getAllOperators", authenticateUser, adminAuth, getAllOperators);

router.get("/getAllFutsal", authenticateUser, adminAuth, getAllFutsal);

router.patch("/verifyFutsal/:id", authenticateUser, adminAuth, verifyFutsal);

module.exports = router;
