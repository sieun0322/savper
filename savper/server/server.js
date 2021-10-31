require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {docRouter} = require("./routes/docRouter");

const app = express();
const { MONGO_URI, PORT} =process.env;

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
    app.use("/docs",docRouter);
    app.listen(PORT, () =>
      console.log("Express server listening on PORT " + PORT)
    );
  })
  .catch((err) => console.log(err));
