const User = require("../models/User");
exports.playerDetail = async (req, res) => {
  await User.find(
    {
      //for future use we can check by userID rather than username to prevent duplication
      /*             _id:req.params.id

 */
      //   username: req.params.username,
    },
    (err, player) => {
      if (!err) {
        res.status(200).send(player);
        console.log(player);

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
