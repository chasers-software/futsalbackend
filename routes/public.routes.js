const express = require("express");
// const router = express.Router();
const controllers = require("../controllers/public.Controller");
const User = require("../models/User");

module.exports = function (app) {
  app.get("/", controllers.allAccess);
};
