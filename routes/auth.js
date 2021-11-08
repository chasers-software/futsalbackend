const express = require("express");
const router = express.Router();
const {
  registerPlayer,
  registerAdmin,
  registerFutsal,
  login,
} = require("../controllers/auth");
router.post("/registeruser", registerPlayer);
router.post("/registerfutsal", registerFutsal);
router.post("/registerAdmin", registerAdmin);
router.post("/login", login);

module.exports = router;
