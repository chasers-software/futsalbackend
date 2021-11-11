const Match = require("../models/Match");
const Futsal = require("../models/Futsal");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const timeslotGenerator = require("../utils/matchgen");

const getAllMatches = async (req, res) => {
  queryObject = {};
  const { futsalName, date, startTime, endTime, price, status } = req.query;
  if (futsalName) {
    queryObject.futsalName = futsalName;
  }
  if (date) {
    queryObject.date = date;
  }
  if (startTime) {
    queryObject.startTime = startTime;
  }
  if (endTime) {
    queryObject.endTime = endTime;
  }
  if (price) {
    queryObject.price = price;
  }
  if (status) {
    queryObject.status = status;
  }
  console.log(queryObject);

  const matches = await Match.find(queryObject);
  res.status(StatusCodes.OK).json({ matches });
};

const getMatch = async (req, res) => {
  const { id: matchId } = req.params;

  const match = await Match.findOne({
    _id: matchId,
  });
  if (!match) {
    throw new NotFoundError(`No match with id ${matchId}`);
  }
  res.status(StatusCodes.OK).json({ match });
};

const createMatch = async (req, res) => {
  const futsal = await Futsal.findOne({ operator: req.user.userId });
  req.body.futsal = futsal._id;
  req.body.futsalName = futsal.futsalName;
  req.body.location = futsal.location;
  req.body.createdBy = req.user.userId;

  const { date, opensAt, closesAt, price } = req.body;
  if ((!date || !opensAt || !closesAt, !price)) {
    throw new BadRequestError(
      " Please provide date,opensAt, closesAt and price"
    );
  }

  const matches = timeslotGenerator(req.body);

  // console.log(matches);
  // res.send("Matches cretaed");

  const matchData = await Match.insertMany(matches);
  res.status(StatusCodes.CREATED).json({ matchData });
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

module.exports = { createMatch, bookMatch, getAllMatches, getMatch };
