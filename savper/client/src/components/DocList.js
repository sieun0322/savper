import React, { useContext, useState } from "react";
import {DocContext} from "../context/DocContext";
import { AuthContext } from "../context/AuthContext";

const DocList = () => {
  const { docs, myDocs, isPublic, setIsPublic } = useContext(DocContext);
  const [me] = useContext(AuthContext);

  const docList = (isPublic?docs:myDocs).map((doc) =>(
  <img 
  alt=""
  style ={{width:"100%"}} 
  key = {doc.key}
  src={`http://localhost:5000/uploads/${doc.key}`}
  />));
  return (
    <div>
      <h3 style={{ display: "inline-block", marginRight: 10 }}>
        DocList({(isPublic ? "공개" : "개인") + "사진"})
      </h3>
      {me&&<buttom onClick={()=>setIsPublic(!isPublic)}>{(isPublic ? "개인" : "공개") + "사진 보기"}</buttom>}
      {docList}
    </div>
  );
};
export default DocList;