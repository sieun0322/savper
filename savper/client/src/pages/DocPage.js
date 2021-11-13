import React, { useState, useContext, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import axios from "axios";
import { DocContext } from "../context/DocContext";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router";


const DocPage = () => {
  const { docId } = useParams();
  const {docs, myDocs, setDocs, setMyDocs} = useContext(DocContext);
  const [me] = useContext(AuthContext);

  const [hasLiked, setHasLiked] = useState(false);
  const doc =
    docs.find((doc) => doc._id === docId) ||
    myDocs.find((doc) => doc._id === docId);
  useEffect(()=>{
    if(me && doc && doc.likes.includes(me.userId)) setHasLiked(true);
  },[me,doc]);
if(!doc) return <h3>Loading</h3>;
const updateDoc = (docs, doc) =>
  [...docs.filter((doc) => doc._id !== docId), doc].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
const onSubmit = async()=>{
  const result = await axios.patch(`/docs/${docId}/${hasLiked?"unlike":"like"}`);
  if(result.data.public) setDocs(updateDoc(docs, result.data));
  else setMyDocs(updateDoc(myDocs, result.data));
  
  setHasLiked(!hasLiked);
};
  return (
    <div>
      <h3>{doc.key}</h3>
      <img
        style={{ width: "100%" }}
        alt={docId}
        src={`http://localhost:5000/uploads/${doc.key}`}
      ></img>
      <span>likes{doc.likes.length}</span>
      <button style={{float:"right"}} onClick={onSubmit}>{hasLiked?"unlike":"like"}</button>
    </div>
  );
};
export default DocPage;
