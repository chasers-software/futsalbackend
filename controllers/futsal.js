const Futsal = require("../models/Futsal");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllFutsal = async (req, res) => {
  const futsals = await Futsal.find({});
  res.status(StatusCodes.OK).json({ futsals });
};

const getFutsal = async (req, res) => {
  const { id } = req.params;

  // const userDetail= await User.find({_id:id});
  // const { id: futsalId } = req.params;

  const futsalId = id;

  const futsal = await Futsal.find({
    _id: futsalId,
  }).populate("operator");
  if (!futsal) {
    throw new NotFoundError(`No futsal with id ${futsalId}`);
  }
  res.status(StatusCodes.OK).json(futsal);
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

const editFutsalDetail = async (req, res) => {
  const pics = req.body.futsalPictures;
  const futsalDescription = req.body.futsalDescription;

  await Futsal.findOne({ _id: req.params.id }, (err, futsal) => {
    if (err) {
      res
        .status(StatusCodes.NotFoundError)
        .send({ message: "NO futsal found with matching id" });
      return;
    }
    if (pics) {
      pics.map((futsalPicture, index) => {
        futsal.futsalPictures[index] = futsalPicture;
      });
    }
    if (futsalDescription) {
      futsal.description = futsalDescription;
    }
    futsal.save((err) => {
      if (err) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Error on editing futsal details" });
        return;
      }
      res
        .status(StatusCodes.OK)
        .send({ message: "futsal detail edited successfully" });
    });
  });
};

module.exports = { getAllFutsal, getFutsal, verifyFutsal, editFutsalDetail };
