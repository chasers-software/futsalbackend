const operatorAuth = require("../middleware/isOperator");

const express = require("express");
const router = express.Router();
const { createMatch, bookMatch } = require("../controllers/match");

router.post("/create", operatorAuth, createMatch);
router.patch("/book/:id", bookMatch);
module.exports = router;
