const express = require("express");
const router = express.Router();
const { getHomepage } = require("../controllers/public");
router.get("/", getHomepage);

module.exports = router;
