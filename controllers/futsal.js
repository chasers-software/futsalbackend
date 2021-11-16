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

  console.log(futsalId)

  const futsal = await Futsal.findOne({
    _id: futsalId,
  })
  if (!futsal) {
    throw new NotFoundError(`No futsal with id ${futsalId}`);
  }

  console.log(futsal)

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

const editFutsalDetail=async(req,res)=>{
  

  const futsal=await Futsal.findOne({_id:req.params.id})

  const futsalDescription=req.body.futsalDescription?req.body.futsalDescription:futsal.description;
  const pics=req.body.images[0]?req.body.images:futsal.futsalPictures;

  console.log(futsalDescription)
  

  try
  {
    const futsalResponse=await Futsal.updateOne(
      {
        _id:req.params.id,
      },
      {
$set:{
  description:futsalDescription,
  futsalPictures:pics
},
      }
    )
    console.log("futssal response",futsalResponse);
    res.status(200).send(futsalResponse);
  }
  catch(e){
    console.log("error on editing");
  }


};


module.exports = { getAllFutsal, getFutsal, verifyFutsal, editFutsalDetail };
