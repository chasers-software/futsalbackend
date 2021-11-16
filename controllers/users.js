const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const Futsal = require("../models/Futsal");
const Match = require("../models/Match");
const { NotFoundError } = require("../errors");

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

  const userDetail= await User.findOne({_id:id});
  console.log(userDetail)
  res.status(StatusCodes.OK).json(userDetail)
}

const editProfile = async (req, res) => {
  const id = req.params.id;
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    if(Object.values(req.body)[i])
    {
    updates[entries[i]] = Object.values(req.body)[i];
    }
  }
  User.updateOne(
    { _id: id },
    {
      $set: updates,
    },
    (err, success) => {
      if (err) {
        throw new NotFoundError(`No user found with id ${id}`);
      }

      res.status(StatusCodes.OK).json({ message: "Update successful" });
    }
  );
};

const changePassword = async (req, res) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPassword, salt);

  try {
    const userPassword = await User.findByIdAndUpdate(
      { _id: id },
      { password: newPassword },
      { new: true }
    );
    return res
      .status(StatusCodes.Ok)
      .json({ message: "successfully updatess password", data: userPassword });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Error on updating password" });
  }
};

module.exports = { getDashboard, getAllUsers, getUser,editProfile,changePassword };
