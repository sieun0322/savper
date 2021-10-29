import React, { useContext } from "react";
import {DocContext} from "../context/DocContext";

const DocList = () => {
  const [docs] = useContext(DocContext);
  const docList = docs.map((doc) =>
  <img style ={{width:"100%"}} 
  key = {doc.key}
  src={`http://localhost:5000/uploads/${doc.key}`}/>)
  return (
    <div>
      <h3>DocList</h3>
      {docList}
    </div>
  );
};
export default DocList;