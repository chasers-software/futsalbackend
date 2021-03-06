const User = require("../models/User");
const Futsal = require("../models/Futsal");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const registerPlayer = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { username: user.username,userId:user._id,name: user.name }, token });
};

const registerAdmin = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username, name: user.name,userId:user._id,role: user.role }, token });
};

const registerFutsal = async (req, res) => {
  const user = await User.create({ ...req.body.operator });

  //transaction is required here

  req.body.futsal.operator = user._id;
  const futsal = await Futsal.create({ ...req.body.futsal });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    futsal: { futsalName: futsal.futsalName,futsalId:futsal._id },
    user: { username: user.username,name: user.name,userId:user._id ,role: user.role },
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

  if(user.role==='player')
  {
  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, name: user.name,userId:user._id,role: user.role }, token });
  }
  else
  {

  //futsal data for user
  const futsal=await Futsal.findOne({operator:user._id})


  // compare password
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ 
      futsal: { futsalName: futsal.futsalName,futsalId:futsal._id },
      user: { username: user.username, name: user.name,role: user.role,userId:user._id}, token });
    }
};

module.exports = {
  registerPlayer,
  registerFutsal,
  registerAdmin,
  login,
};
