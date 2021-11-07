const operatorAuth = require("../middleware/isOperator");
const authenticateUser = require("../middleware/authentication");

const express = require("express");
const router = express.Router();
const {
  createMatch,
  bookMatch,
  getAllMatches,
} = require("../controllers/match");

router.post("/create", authenticateUser, operatorAuth, createMatch);
router.patch("/book/:id", authenticateUser, bookMatch);
router.get("/", getAllMatches);
module.exports = router;
