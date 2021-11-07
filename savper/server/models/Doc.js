const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
  {
    user: {
      //객체는 _id자동 생성
      _id: { type: mongoose.Types.ObjectId, required: true, index: true },
      name: { type: String, required: true },
      username: { type: String, required: true },
    },
    likes: [{ type: mongoose.Types.ObjectId, }],
    public: { type: Boolean, required: true, default: false },
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  { timestamps: true } //생성, 업데이트 날짜 자동 저장
);

module.exports = mongoose.model("doc",docSchema);