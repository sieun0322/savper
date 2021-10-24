const mongoose = require("mongoose");

const docSchema = new mongoose.Schema(
    {
        key:{type:String, required:true},
        originalFileName:{type:String, required:true},
    },
    {timestamps:true}//생성, 업데이트 날짜 자동 저장
);

module.exports = mongoose.model("doc",docSchema);