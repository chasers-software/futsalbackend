const User = require("../models/User");
exports.futsalOperatorDetail = async (req, res) => {
  await User.findOne(
    {
      //for future use we can check by userID rather than username to prevent duplication
      /*             _id:req.params.id

 */
      username: req.params.username,
    },
    (err, operator) => {
      if (!err) {
        res.status(200).send(operator);
        console.log(operator);

        // res.status(500).send({ message: err });
        // console.log({ message: err });
        // return;
      } else {
        throw err;
      }
    }
  )
    //  error fix for "Query was already executed:" from stackoverflow
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};
