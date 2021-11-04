const User = require("../models/User");
const Futsal = require("../models/Futsal");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const registerPlayer = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const registerFutsal = async (req, res) => {
  const user = await User.create({ ...req.body.operator });

  //transaction is required here

  req.body.futsal.operator = user._id;
  const futsal = await Futsal.create({ ...req.body.futsal });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    futsal: { futsalName: futsal.futsalName },
    user: { name: user.name },
    token,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, role: user.role }, token });
};

module.exports = {
  registerPlayer,
  registerFutsal,
  login,
};
