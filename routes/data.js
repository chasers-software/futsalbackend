const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/data");
router.get("/", getData);

module.exports = router;
