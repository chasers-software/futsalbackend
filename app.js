// require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routers
// const authRouter = require("./routes/auth");
// const dataRouter = require("./controllers/data");
app.use(express.json());

const router = express.Router();
require("./routes/auth")(app);
require("./routes/public.routes")(app);
require("./routes/player.routes")(app);
require("./routes/futsalOperator.routes")(app);

app.use("/", router);

// app.get("/", (req, res) => {
//   res.send("<h1>FUTSAL API</h1>");
// });

// routes
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/data", authenticateUser, dataRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const MONGO_URI =
  "mongodb+srv://sauzzon:1234567890@nodeexpresscluster.xpzo6.mongodb.net/FutsalBackend?retryWrites=true&w=majority";
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
