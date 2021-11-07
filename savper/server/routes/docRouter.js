const {Router} = require("express");
const docRouter = Router();
const Doc = require("../models/Doc");//const Doc = mongoose.model("Doc");
const { upload } = require("../middleware/docUpload");
const fs = require("fs");
const {promisify} = require("util");
const fileUnlink = promisify(fs.unlink);
const mongoose = require("mongoose");

docRouter.post("/", upload.single("doc"), async (req, res) => {

  console.log(req.file); // 저장될 때까지 기다림
  try {
    if(!req.user) throw new Error("권한이 없습니다.");
      const doc = await new Doc({
        user: {
          _id: req.user.id,
          name: req.user.name,
          username: req.user.username,
        },
        public:req.body.public,
        key: req.file.filename,
        originalFileName: req.file.originalname,
      }).save();
      res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }

});
docRouter.get("/", async (req, res) => {
  //public 이미지만 제공
  const docs = await Doc.find({public:true});
  res.json(docs);
});
docRouter.delete("/:docId", async (req, res) => {
  //유저 권한 확인
  //사진 삭제
  try {
    console.log(req.params);
    if(!req.user) throw new Error("권한이 없습니다.");
    if(!mongoose.isValidObjectId(req.params.docId)) throw new Error("올바르지 않은 이미지ID 입니다.");
     
    const doc = await Doc.findOneAndDelete({ _id: req.params.docId });
    if(!doc) return res.json({ message: "이미 삭제된 이미지입니다." });
    await fileUnlink(`./uploads/${doc.key}`);
    console.log(doc);
    res.json({message:"요청하신 이미지가 삭제 되었습니다."});
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
docRouter.patch("/:docId/like", async (req, res) => {
  //유저 권한 확인
  //like 중복 확인
  try{
    if (!req.user) throw new Error("권한이 없습니다.");
    if (!mongoose.isValidObjectId(req.params.docId))
      throw new Error("올바르지 않은 문서ID 입니다.");
    const doc = await Doc.findOneAndUpdate(
      { _id: req.params.docId },
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
    res.json({doc});
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
docRouter.patch("/:docId/unlike", async (req, res) => {
  //유저 권한 확인
  //like 중복 취소 확인
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    if (!mongoose.isValidObjectId(req.params.docId))
      throw new Error("올바르지 않은 문서ID 입니다.");
    const doc = await Doc.findOneAndUpdate(
      { _id: req.params.docId },
      {$pull:{likes:req.user.id}},
      { new: true }
    );
    res.json({ doc });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
module.exports = { docRouter };