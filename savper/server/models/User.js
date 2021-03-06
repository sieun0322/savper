const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true},
    sessions:[{
        createdAt:{type:Date, required:true},
    },],
  },
  { timestamps: true } //생성, 업데이트 날짜 자동 저장
);

module.exports = mongoose.model("user", UserSchema);