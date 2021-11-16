const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const Futsal = require("../models/Futsal");
const Match = require("../models/Match");

const getDashboard = async (req, res) => {
  const user = await User.find({ _id: req.user.userId });
  const futsal = await Futsal.find({ operator: req.user.userId });
  const bookedMatches = await Match.find({ bookedBy: req.user.userId });
  res.status(StatusCodes.OK).json({ user, futsal, bookedMatches });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

const getUser = async (req,res)=>{
  console.log('request received')

  const {id}=req.params

  const userDetail= await User.find({_id:id});
  console.log(userDetail)
  res.status(StatusCodes.OK).json(userDetail)
}

module.exports = { getDashboard, getAllUsers, getUser };
