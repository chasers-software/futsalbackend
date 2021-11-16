const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authentication");
const adminAuth = require("../middleware/isAdmin");
const operatorAuth = require("../middleware/isOperator");

const {
  getAllFutsal,
  getFutsal,
  verifyFutsal,
  editFutsalDetail,
} = require("../controllers/futsal");

router.get("/", getAllFutsal);
router.get("/:id", getFutsal);
router.patch("/verify/:id", authenticateUser, adminAuth, verifyFutsal);
router.patch(
  "/editFutsalDetail/:id",
  [authenticateUser, operatorAuth],
  editFutsalDetail
);

module.exports = router;
