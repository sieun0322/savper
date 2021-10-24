require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const mongoose = require("mongoose");
const Doc = require("./models/Doc");//const Doc = mongoose.model("Doc");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpeg"].includes(file.mimetype)) cb(null, true);
    else cb(new Error("invalid file type."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, //5MB
  },
});

const app = express();
const PORT = 5000;

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      //useCreateIndex:true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected.");
    app.use("/uploads", express.static("uploads"));
    app.post("/docs", upload.single("doc"), async (req, res) => {
        console.log(req.file); // 저장될 때까지 기다림
        const doc = await new Doc({key:req.file.filename, originalFileName:req.file.originalname}).save();
        res.json(doc);
    });
    app.get("/docs",async(req,res)=>{
        const docs = await Doc.find();
        res.json(docs);
    });
    app.listen(PORT, () =>
      console.log("Express server listening on PORT " + PORT)
    );
  })
  .catch((err) => console.log(err));
