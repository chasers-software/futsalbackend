const express = require("express");
// const router = express.Router();
const { register, login } = require("../controllers/auth");
module.exports = function (app) {
  app.post("/register", register);
  app.post("/login", login);
};
