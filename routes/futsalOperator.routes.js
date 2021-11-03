const express = require("express");
// const router = express.Router();
const controllers = require("../controllers/futsalOperator.controller");
const User = require("../models/User");

module.exports = function (app) {
  app.get(
    "/api/futsalOperator/:username",

    /*    in future need some kind of token verification and isPlayer verification
     */

    controllers.futsalOperatorDetail
  );
};
