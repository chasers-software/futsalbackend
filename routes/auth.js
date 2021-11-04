const express = require("express");
const router = express.Router();
const {
  registerPlayer,
  registerFutsal,
  login,
} = require("../controllers/auth");
router.post("/registeruser", registerPlayer);
router.post("/registerfutsal", registerFutsal);
router.post("/login", login);

module.exports = router;
