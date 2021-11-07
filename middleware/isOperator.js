const { UnauthenticatedError } = require("../errors");

const operatorAuth = async (req, res, next) => {
  if (req.user.role === "player") {
    throw new UnauthenticatedError("Operator Authentication invalid");
  }
  next();
};

module.exports = operatorAuth;
