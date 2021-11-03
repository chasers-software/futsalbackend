const express = require("express");
// const router = express.Router();
const controllers = require("../controllers/playerController");
const User = require("../models/User");

module.exports = function (app) {
  app.get(
    "/api/player/:username",

    /*    in future need some kind of token verification and isPlayer verification
     */

    controllers.playerDetail
  );
};
