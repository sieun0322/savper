import React, { useContext, useEffect,useRef } from "react";
import {DocContext} from "../context/DocContext";
import { AuthContext } from "../context/AuthContext";
import "./DocList.css";
import { Link } from "react-router-dom";

const DocList = () => {
  const {
    docs,
    myDocs,
    isPublic,
    setIsPublic,
    loaderMoreDocs,
    docLoading,
    docError,
  } = useContext(DocContext);
  const [me] = useContext(AuthContext);
  const elementRef = useRef(null);

useEffect(() => {
  if (!elementRef.current) return;
  const observer = new IntersectionObserver(([entry]) => {
    console.log("intersection", entry.isIntersecting);
    if (entry.isIntersecting) loaderMoreDocs();
  });
  observer.observe(elementRef.current);
  return () => observer.disconnect();
}, [loaderMoreDocs]);
  const docList = isPublic
    ? docs.map((doc, index) => (
        <Link
          key={doc.key}
          to={`/docs/${doc._id}`}
          ref={index + 1 === docs.length ? elementRef : undefined}
        >
          <img
            alt=""
            key={doc.key}
            src={`http://localhost:5000/uploads/${doc.key}`}
          />
        </Link>
      ))
    : myDocs.map((doc, index) => (
        <Link
          key={doc.key}
          to={`/docs/${doc._id}`}
          ref={index + 5 === myDocs.length ? elementRef : undefined}
        >
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
      {docError && <div>Error...</div>}
      {docLoading && <div>Loading...</div>}
    </div>
  );
};
export default DocList;