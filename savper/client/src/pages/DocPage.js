import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { DocContext } from "../context/DocContext";
import { useParams } from "react-router";


const DocPage = () => {
  const { docId } = useParams();
  const {docs, myDocs} = useContext(DocContext);
  const doc =
    docs.find((doc) => doc._id === docId) ||
    myDocs.find((doc) => doc._id === docId);

if(!doc) return <h3>Loading</h3>;

  return (
    <div>
      <h3>{doc.key}</h3>
      <img
        style={{ width: "100%" }}
        alt={docId}
        src={`http://localhost:5000/uploads/${doc.key}`}
      ></img>
    </div>
  );
};
export default DocPage;
