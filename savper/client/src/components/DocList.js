import React, { useContext, useState } from "react";
import {DocContext} from "../context/DocContext";
import { AuthContext } from "../context/AuthContext";
import "./DocList.css";
import { Link } from "react-router-dom";

const DocList = () => {
  const { docs, myDocs, isPublic, setIsPublic, loaderMoreDocs } =
    useContext(DocContext);
  const [me] = useContext(AuthContext);

  const docList = (isPublic?docs:myDocs).map((doc) => (
    <Link key={doc.key} to={`/docs/${doc._id}`}>
      <img
        alt=""
        key={doc.key}
        src={`http://localhost:5000/uploads/${doc.key}`}
      />
    </Link>
  ));
  return (
    <div>
      <h3 style={{ display: "inline-block", marginRight: 10 }}>
        DocList({(isPublic ? "공개" : "개인") + "사진"})
      </h3>
      {me && (
        <button onClick={() => setIsPublic(!isPublic)}>
          {(isPublic ? "개인" : "공개") + "사진 보기"}
        </button>
      )}
      <div className="doc-list-container">{docList}</div>
      <button onClick={loaderMoreDocs}>NEXT docs</button>
    </div>
  );
};
export default DocList;