const { UnauthenticatedError } = require("../errors");

const adminAuth = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    throw new UnauthenticatedError("Need Admin role");
  }
};

module.exports = adminAuth;
