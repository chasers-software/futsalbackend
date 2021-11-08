const Futsal = require("../models/Futsal");
const User = require("../models/User");

const getAllOperators = async (req, res) => {
  const operators = await User.find({ roles: "operator" });
  console.log("Operator records", operators);
  res.status(200).json({ operators });
};

const getAllFutsal = async (req, res) => {
  const operators = await Futsal.find({});
  console.log("Futsal records", operators);
  res.status(200).json({ operators });
};

const verifyFutsal = async (req, res) => {
  try {
    const verificatioResponse = await Futsal.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          verified: true,
        },
      }
    );
    console.log(" futsal verification response: ", verificatioResponse);
    res.status(200).send(verificatioResponse);
  } catch (e) {
    console.log("error on verification", e);
  }
};

module.exports = { getAllOperators, verifyFutsal, getAllFutsal };
