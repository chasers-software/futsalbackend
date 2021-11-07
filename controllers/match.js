const Match = require("../models/Match");
const Futsal = require("../models/Futsal");

const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllMatches = async (req, res) => {
  const matches = await Match.find({});
  res.status(StatusCodes.OK).json({ matches });
};

const createMatch = async (req, res) => {
  const futsal = await Futsal.findOne({ operator: req.user.userId });
  req.body.futsal = futsal._id;
  req.body.createdBy = req.user.userId;

  const match = await Match.create(req.body);
  res.status(StatusCodes.CREATED).json({ match });
};

const bookMatch = async (req, res) => {
  const {
    user: { userId },
    params: { id: matchId },
  } = req;

  const match = await Match.findOneAndUpdate(
    {
      _id: matchId,
      status: "open",
    },
    {
      bookedBy: userId,
      status: "booked",
    },
    { new: true, runValidators: true }
  );
  if (!match) {
    throw new NotFoundError(`No open match with id ${matchId}`);
  }
  res.status(StatusCodes.OK).json({ match });
};

module.exports = { createMatch, bookMatch, getAllMatches };
