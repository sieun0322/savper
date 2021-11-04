require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { docRouter } = require("./routes/docRouter");
const { userRouter } = require("./routes/userRouter");
const app = express();
const { MONGO_URI, PORT} =process.env;
const { authenticate } = require("./middleware/authentication");

mongoose
  .connect(MONGO_URI,
    {
      //useCreateIndex:true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected.");
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());//자동 json변환
    app.use(authenticate);
    app.use("/docs",docRouter);
    app.use("/users", userRouter);
    
    app.listen(PORT, () =>
      console.log("Express server listening on PORT " + PORT)
    );
  })
  .catch((err) => console.log(err));
