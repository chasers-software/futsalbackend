const Futsal = require("../models/Futsal");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllFutsal = async (req, res) => {
  const futsals = await Futsal.find({});
  res.status(StatusCodes.OK).json({ futsals });
};

const getFutsal = async (req, res) => {
  const { id: futsalId } = req.params;

  const futsal = await Futsal.findOne({
    _id: futsalId,
  });
  if (!futsal) {
    throw new NotFoundError(`No futsal with id ${futsalId}`);
  }
  res.status(StatusCodes.OK).json({ futsal });
};

const verifyFutsal = async (req, res) => {
  const { id: futsalId } = req.params;

  const futsal = await Futsal.findOneAndUpdate(
    {
      _id: futsalId,
    },
    {
      verified: true,
    },
    { new: true, runValidators: true }
  );

  if (!futsal) {
    throw new NotFoundError(`No unverified futsal with id ${futsalId}`);
  }
  res.status(StatusCodes.OK).json({ futsal });
};

module.exports = { getAllFutsal, getFutsal, verifyFutsal };