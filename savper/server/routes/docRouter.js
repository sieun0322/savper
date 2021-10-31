const {Router} = require("express");
const docRouter = Router();
const Doc = require("../models/Doc");//const Doc = mongoose.model("Doc");
const { upload } = require("../middleware/docUpload");

docRouter.post("/", upload.single("doc"), async (req, res) => {
  console.log(req.file); // 저장될 때까지 기다림
  const doc = await new Doc({
    key: req.file.filename,
    originalFileName: req.file.originalname,
  }).save();
  res.json(doc);
});
docRouter.get("/", async (req, res) => {
  const docs = await Doc.find();
  res.json(docs);
});

module.exports = { docRouter };